const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: 'dqvqvvwc8',
  api_key: '749146838886466',
  api_secret: '-L_TLr1SwbtjDrRVcX5SljGVn_M',
});

// Upload a file to Cloudinary
const uploadOnCloudinary = async (localFilePath, resourceType = 'raw') => {
  try {
    if (!localFilePath) {
      throw new Error('No file path provided');
    }

    // Upload the file to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: resourceType,
    });

    // Remove the local file after upload
    fs.unlinkSync(localFilePath);

    // Log and return the response
    console.log('File uploaded successfully', response.url);
    return response;
  } catch (error) {
    // Remove the local file if an error occurs
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    console.error('Error uploading file to Cloudinary:', error);
    throw error; // Re-throw error to handle it in the calling function
  }
};

// Delete a file from Cloudinary
const deleteFromCloudinary = async (publicId, resourceType = 'image') => {
  try {
    const response = await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
    console.log('File deleted successfully', response);
    return response;
  } catch (error) {
    console.error('Error deleting file from Cloudinary:', error);
    throw error; // Re-throw error to handle it in the calling function
  }
};

module.exports = { uploadOnCloudinary, deleteFromCloudinary };
