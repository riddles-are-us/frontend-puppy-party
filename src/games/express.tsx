import axios from "axios";

// Get the current URL components
const currentLocation = window.location;
const protocol = currentLocation.protocol; // e.g., 'http:' or 'https:'
const hostname = currentLocation.hostname; // e.g., 'sinka' or 'localhost'

const instance = axios.create({
  baseURL: `${protocol}//${hostname}` + ":3000",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export async function uploadImage(
  name: string,
  avatarFile: File,
  spriteSheetFile: File
) {
  try {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("avatar", avatarFile);
    formData.append("spriteSheet", spriteSheetFile);
    const response = await instance.post("/upload", formData);

    if (response.status === 200) {
      const jsonResponse = response.data;
      return jsonResponse;
    } else {
      throw "UploadImageError " + response.status;
    }
  } catch (error) {
    throw "UploadImageError " + error;
  }
}
