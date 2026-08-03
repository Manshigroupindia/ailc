const CLOUDINARY_CLOUD_NAME = 'kklzirk7';
const CLOUDINARY_UPLOAD_PRESET = 'ailc_upload';
const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

/**
 * Uploads a file to Cloudinary and returns the secure_url string.
 * @param {File} file - The file object from file input or drag-and-drop.
 * @returns {Promise<string>} The secure_url returned by Cloudinary.
 */
export const uploadToCloudinary = async (file) => {
  if (!file) throw new Error('No file provided for upload.');

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  try {
    const response = await fetch(CLOUDINARY_UPLOAD_URL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.error?.message || 'Cloudinary upload failed.');
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error('Cloudinary Upload Error:', error);
    throw error;
  }
};
