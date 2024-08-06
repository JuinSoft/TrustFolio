import axios from "axios";


// Upload file to IPFS (using Pinata service)
const sendFileToIPFS = async (file) => {
    if (file) {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const resFile = await axios({
                method: "post",
                url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                data: formData,
                headers: {
                    'pinata_api_key': process.env.NEXT_APP_PINATA_API_KEY,
                    'pinata_secret_api_key': process.env.NEXT_APP_PINATA_API_SECRET,
                    "Content-Type": "multipart/form-data"
                },
            });

            const url = `${process.env.NEXT_APP_PINATA_GATEWAY}${resFile.data.IpfsHash}`;
            return url;
        } catch (error) {
            console.log("Error sending File to IPFS: ", error);
        }
    }
};

export default sendFileToIPFS;