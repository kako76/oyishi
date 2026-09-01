import React, { useState } from 'react';
import { Image as ImageIcon, X } from 'lucide-react';
import { adminOrdersService } from '../../services/adminOrdersService';

interface ImageUploaderProps {
  currentUrl: string;
  folder: string;
  onUploadSuccess: (url: string) => void;
  onRemove: () => void;
  label?: string;
  helpText?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  currentUrl,
  folder,
  onUploadSuccess,
  onRemove,
  label = 'Fotografía',
  helpText
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadProgress, setUploadProgress] = useState('');

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    
    setIsUploading(true);
    setUploadError('');
    setUploadProgress('Subiendo...');

    try {
      const token = adminOrdersService.getToken();
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      const res = await fetch('/api/admin/images', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await res.json();
      if (res.ok && data.success) {
        onUploadSuccess(data.url);
        setUploadProgress('✓ Imagen subida correctamente');
        setTimeout(() => setUploadProgress(''), 3000);
      } else {
        setUploadError(data.error || 'Error al subir la imagen');
      }
    } catch (err: any) {
      setUploadError(err.message || 'Error de conexión');
    } finally {
      setIsUploading(false);
      if (e.target) e.target.value = ''; // Reset input
    }
  };

  return (
    <div>
      <label className="block text-[10px] text-oyishi-gold uppercase tracking-widest mb-2 font-medium">{label}</label>
      
      <div className="flex flex-col gap-4">
        {currentUrl && (
          <div className="relative w-40 h-24 sm:w-64 sm:h-36 rounded-lg border border-oyishi-border/60 overflow-hidden bg-[#1A1513]">
            <img src={currentUrl} alt="Preview" className="w-full h-full object-cover" />
            <button 
              type="button" 
              onClick={onRemove}
              className="absolute top-2 right-2 bg-black/70 p-1.5 rounded-full text-white hover:text-red-400 transition-colors"
              title="Eliminar imagen actual"
            >
              <X size={14} />
            </button>
          </div>
        )}
        
        <div>
          <label className={`cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-oyishi-card border border-oyishi-border rounded transition-colors text-xs font-sans uppercase tracking-widest text-oyishi-text ${isUploading ? 'opacity-50 cursor-not-allowed' : 'hover:border-oyishi-gold'}`}>
            <ImageIcon size={14} className={isUploading ? "animate-pulse text-oyishi-gold" : "text-oyishi-gold"} />
            {isUploading ? 'Subiendo...' : currentUrl ? 'Reemplazar imagen' : 'Subir imagen'}
            <input type="file" accept="image/jpeg, image/png, image/webp, image/avif" className="hidden" onChange={handleUploadImage} disabled={isUploading} />
          </label>
          
          {helpText && !uploadProgress && !uploadError && <p className="text-[10px] text-oyishi-textSec mt-2">{helpText}</p>}
          {uploadProgress && <p className="text-emerald-400 text-[11px] mt-2 font-mono">{uploadProgress}</p>}
          {uploadError && <p className="text-red-400 text-[11px] mt-2 font-mono">{uploadError}</p>}
        </div>
      </div>
    </div>
  );
};
