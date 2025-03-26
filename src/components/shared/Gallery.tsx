import React, { useState } from 'react';
import { Dialog, DialogContent, ImageList, ImageListItem } from '@mui/material';

export const Gallery = (
  {
    photos,
  }: {
    photos: string[];
  },
) => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleClickOpen = (img) => {
    setSelectedImage(img);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  return (
    <div>
      <ImageList cols={3} gap={8}>
        {photos.map((img, index) => (
          <ImageListItem key={index} onClick={() => handleClickOpen(img)}>
            <img
              src={img}
              alt={`Gallery item ${index}`}
              style={{ width: '100%', height: 'auto', cursor: 'pointer', borderRadius: '8px' }}
            />
          </ImageListItem>
        ))}
      </ImageList>
      <Dialog open={open} onClose={handleClose} maxWidth="md">
        <DialogContent>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Selected"
              style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
