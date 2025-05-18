import axios from "axios";

const apiKey = "47134432-526bba048ec025514e6d359f8";
const pixabay = "https://pixabay.com/api/";
const baseUrl = `${pixabay}?key=${apiKey}`;

export const BlogHeaderPic = async () => {
  try {
    const response = await axios.get(`${baseUrl}&q=Palestine&image_type=photo&fullHDURL`);
    const images = response.data.hits.map((hit) => hit.webformatURL); // Extract image URLs
    return images; // Array of image URLs
  } catch (error) {
    console.log("Error fetching image: ", error);
    return [];
  }
};


export const Headerbackgroundimg = async () => {
    try {
        const response = await axios.get(`${baseUrl}&q=Bangladesh&image_type=photo&orientation=horizontal&colors=green&category=nature`);
        const images = response.data.hits.map((hit) => hit.webformatURL);
        const randomImage = images[Math.floor(Math.random() * images.length)];
        return randomImage
    } catch (error) {
        console.log("Image failed to load", error);
        return [];
    }
}
