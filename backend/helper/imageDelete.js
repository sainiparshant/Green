import { imagekit } from "../config.js/imageKit.js";

const deleteImages = async (imageIds = []) => {
  for (const id of imageIds) {
    try {
      await imagekit.deleteFile(id);
    } catch (err) {
      console.error("Failed to delete image:", id);
    }
  }
};


export default deleteImages;