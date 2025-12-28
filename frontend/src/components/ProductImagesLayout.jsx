import React from 'react'

const ProductImagesLayout = ({
    images,
    activeImage,
    setActiveImage
}) => {
  return (
    <div>
       <div>
            <img
              src={activeImage}
              alt=""
              className="w-full rounded-lg duration-300"
            />
          </div>

          <div className="grid grid-cols-4 gap-2 md:gap-6 py-4 ">
            {images.map((img) => (
              <button
                key={img._id}
                onClick={() => setActiveImage(img.url)}
                className={`rounded-lg border ${
                  activeImage === img.url
                    ? "border-emerald-500"
                    : "border-gray-300"
                }`}
              >
                <img
                  src={img.url}
                  alt=""
                  className="rounded-lg cursor-pointer "
                />
              </button>
            ))}
          </div>
    </div>
  )
}

export default ProductImagesLayout
