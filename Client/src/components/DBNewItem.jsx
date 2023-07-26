import React, { useState } from "react";
import { motion } from "framer-motion";
import { fadeInOut } from "../animations";
import { FaCloudUploadAlt, MdDelete } from "../assets/icons";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { alertDanger, alertNULL, alertSuccess } from "../context/actions/alertActions";
import { buttonClick } from "../animations";
import { addNewProduct, getAllProducts } from "../api";
import { setAllProducts } from "../context/actions/productActions";
import { storage } from "../config/firebase.config";
import { Spinner } from "../components";
import { statuses } from "../utils/styles";

const DBNewItem = () => {
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(null);
  const [imageDownloadURL, setImageDownloadURL] = useState(null);

  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  const handleUploadImage = async (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}_${imageFile.name}`);

    try {
      const uploadTaskSnapshot = await uploadBytesResumable(storageRef, imageFile);
      const downloadURL = await getDownloadURL(uploadTaskSnapshot.ref);
      setImageDownloadURL(downloadURL);
      setIsLoading(false);
      setProgress(null);
      dispatch(alertSuccess("Image Uploaded to the cloud"));
      setTimeout(() => {
        dispatch(alertNULL());
      }, 3000);
    } catch (error) {
      setIsLoading(false);
      dispatch(alertDanger(`Error: ${error}`));
      setTimeout(() => {
        dispatch(alertNULL());
      }, 3000);
    }
  };

  const handleDeleteImageFromFirebase = async () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageDownloadURL);

    try {
      await deleteObject(deleteRef);
      setImageDownloadURL(null);
      setIsLoading(false);
      dispatch(alertSuccess("Image removed from the cloud"));
      setTimeout(() => {
        dispatch(alertNULL());
      }, 3000);
    } catch (error) {
      setIsLoading(false);
      dispatch(alertDanger(`Error: ${error}`));
      setTimeout(() => {
        dispatch(alertNULL());
      }, 3000);
    }
  };

  const handleSubmitNewData = async () => {
    const data = {
      product_name: itemName,
      product_category: category,
      product_price: price,
      imageURL: imageDownloadURL,
    };

    try {
      await addNewProduct(data);
      dispatch(alertSuccess("New Item added"));
      setTimeout(() => {
        dispatch(alertNULL());
      }, 3000);
      setImageDownloadURL(null);
      setItemName("");
      setPrice("");
      setCategory(null);

      const products = await getAllProducts();
      dispatch(setAllProducts(products));
    } catch (error) {
      dispatch(alertDanger(`Error: ${error}`));
      setTimeout(() => {
        dispatch(alertNULL());
      }, 3000);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col pt-6 px-24 w-full">
      <div className="border border-gray-300 rounded-md p-4 w-full flex flex-col items-center justify-center gap-4">
        <InputValueField
          type="text"
          placeHolder="Item name here"
          stateFunc={setItemName}
          stateValue={itemName}
        />

        <div className="w-full flex items-center justify-around gap-3 flex-wrap">
          {statuses &&
            statuses.map((data) => (
              <p
                key={data.id}
                onClick={() => setCategory(data.category)}
                className={`px-4 py-3 rounded-md text-xl text-textColor font-semibold cursor-pointer hover:shadow-md border border-gray-200 backdrop-blur-md ${
                  data.category === category ? "bg-red-400 text-primary" : "bg-transparent"
                }`}
              >
                {data.title}
              </p>
            ))}
        </div>

        <InputValueField
          type="number"
          placeHolder="Item price here"
          stateFunc={setPrice}
          stateValue={price}
        />

        <div className="w-full bg-card backdrop-blur-md h-370 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
          {isLoading ? (
            <div className="w-full h-full flex flex-col items-center justify-evenly px-24">
              <Spinner />
              {Math.round(progress) > 0 && (
                <div className="w-full flex flex-col items-center justify-center gap-2">
                  <div className="flex justify-between w-full">
                    <span className="text-base font-medium text-textColor">Progress</span>
                    <span className="text-sm font-medium text-textColor">
                      {Math.round(progress)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-red-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                      style={{ width: `${Math.round(progress)}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              {!imageDownloadURL ? (
                <>
                  <label>
                    <div className="flex flex-col items-center justify-center h-full w-full cursor-pointer">
                      <div className="flex flex-col justify-center items-center cursor-pointer">
                        <p className="font-bold text-4xl">
                          <FaCloudUploadAlt className="-rotate-0" />
                        </p>
                        <p className="text-lg text-textColor">Click to upload an image</p>
                      </div>
                    </div>
                    <input
                      type="file"
                      name="upload-image"
                      accept="image/*"
                      onChange={handleUploadImage}
                      className="w-0 h-0"
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative w-full h-full overflow-hidden rounded-md flex items-center justify-center">
                    <motion.img
                      whileHover={{ scale: 1.2 }}
                      src={imageDownloadURL}
                      className="w-auto h-full object-cover"
                    />
                    <motion.button
                      {...buttonClick}
                      type="button"
                      className="absolute top-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                      onClick={handleDeleteImageFromFirebase}
                    >
                      <MdDelete className="-rotate-0" />
                    </motion.button>
                  </div>
                </>
              )}
            </>
          )}
        </div>

        <motion.button
          onClick={handleSubmitNewData}
          {...buttonClick}
          className="w-9/12 py-2 rounded-md bg-red-400 text-primary hover:bg-red-500 cursor-pointer"
          disabled={isLoading}
        >
          Save
        </motion.button>
      </div>
    </div>
  );
};

const InputValueField = ({ type, placeHolder, stateValue, stateFunc }) => {
  return (
    <input
      type={type}
      placeholder={placeHolder}
      className="w-full px-4 py-3 bg-lightOverlay shadow-md outline-none rounded-md border border-gray-200 focus:border-red-400"
      value={stateValue}
      onChange={(e) => stateFunc(e.target.value)}
    />
  );
};

export default DBNewItem;
