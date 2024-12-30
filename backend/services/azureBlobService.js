const { BlobServiceClient } = require('@azure/storage-blob');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
const containerName = 'videos-container'; // create this container in your Azure Storage

async function uploadFileToBlob(file) {
  try {
    const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
    const containerClient = blobServiceClient.getContainerClient(containerName);

    const blobName = file.filename + path.extname(file.originalname);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    const uploadBlobResponse = await blockBlobClient.uploadFile(file.path, {
      blobHTTPHeaders: { blobContentType: file.mimetype },
    });

    console.log('Blob was uploaded successfully', uploadBlobResponse.requestId);

    // Return the URL of the file in Azure Blob
    const url = blockBlobClient.url;

    return { url };
  } catch (error) {
    console.log(error);
    throw new Error('Error uploading to Azure Blob Storage');
  }
}

module.exports = {
  uploadFileToBlob
};
