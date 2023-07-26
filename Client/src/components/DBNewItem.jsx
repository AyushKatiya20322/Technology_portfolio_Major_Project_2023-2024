import React, { useState } from "react";
import { motion } from "framer-motion";
import { fadeInOut } from "../animations";
import { FaCloudUploadAlt, MdDelete } from "../assets/icons";
import { BsExclamationTriangleFill } from "react-icons/bs";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { alertDanger, alertNULL, alertSuccess } from "../context/actions/alertActions";
import { buttonClick } from "../animations";
import { addNewProduct } from "../api";
import { getAllProducts } from "../api";
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

  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}_${imageFile.name}`);

    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        setIsLoading(false);
        dispatch(alertDanger(`Error: ${error}`));
        setTimeout(() => {
          dispatch(alertNULL());
        }, 3000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            setImageDownloadURL(downloadURL);
            setIsLoading(false);
            setProgress(null);
            dispatch(alertSuccess("Image Uploaded to the cloud"));
            setTimeout(() => {
              dispatch(alertNULL());
            }, 3000);
          })
          .catch((error) => {
            setIsLoading(false);
            dispatch(alertDanger(`Error: ${error}`));
            setTimeout(() => {
              dispatch(alertNULL());
            }, 3000);
          });
      }
    );
  };

  const deleteImageFromFirebase = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageDownloadURL);

    deleteObject(deleteRef)
      .then(() => {
        setImageDownloadURL(null);
        setIsLoading(false);
        dispatch(alertSuccess("Image removed from the cloud"));
        setTimeout(() => {
          dispatch(alertNULL());
        }, 3000);
      })
      .catch((error) => {
        setIsLoading(false);
        dispatch(alertDanger(`Error: ${error}`));
        setTimeout(() => {
          dispatch(alertNULL());
        }, 3000);
      });
  };

  const submitNewData = () => {
    const data = {
      product_name: itemName,
      product_category: category,
      product_price: price,
      imageURL: imageDownloadURL,
    };
    addNewProduct(data)
      .then((res) => {
        console.log(res);
        dispatch(alertSuccess("New Item added"));
        setTimeout(() => {
          dispatch(alertNULL());
        }, 3000);
        setImageDownloadURL(null);
        setItemName("");
        setPrice("");
        setCategory(null);
      })
      .catch((error) => {
        dispatch(alertDanger(`Error: ${error}`));
        setTimeout(() => {
          dispatch(alertNULL());
        }, 3000);
      });

    getAllProducts().then((data) => {
      dispatch(setAllProducts(data));
    });
  };

  return (
    <div className="flex items-center justify-center flex-col pt-6 px-24 w-full">
      <div className="border border-gray-300 rounded-md p-4 w-full flex flex-col items-center justify-center gap-4">
        {/* Input fields... */}
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
                  data.category === category
                    ? "bg-red-400 text-primary"
                    : "bg-transparent"
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
                  {/* Progress bar display */}
                </div>
              )}
            </div>
          ) : (
            <>
              {!imageDownloadURL ? (
                <>
                  <label>
                    <div className="flex flex-col items-center justify-center h-full w-full cursor-pointer">
                      {/* Image upload placeholder */}
                      <input
                        type="file"
                        name="upload-image"
                        accept="image/*"
                        onChange={uploadImage}
                        className="w-0 h-0"
                      />
                    </div>
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
                      onClick={() => deleteImageFromFirebase(imageDownloadURL)}
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
          onClick={submitNewData}
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


export const InputValueField = ({ type, placeHolder, stateValue, stateFunc }) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeHolder}
        className="w-full px-4 py-3 bg-lightOverlay shadow-md outline-none rounded-md border border-gray-200 focus:border-red-400"
        value={stateValue}
        onChange={(e) => stateFunc(e.target.value)}
      />
    </>
  );
};

export default DBNewItem;
