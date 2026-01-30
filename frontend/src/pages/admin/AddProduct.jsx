import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import API from "../../api/axios";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
    size: "",
    title: "",
    productType: "",
  });

  const [images, setImages] = useState([]);
  const [plantDetails, setPlantDetails] = useState({
    category: "",
    water: "",
    light: "",
    carelevel: "",
    height: "",
    potIncluded: "",
  });

  const [potDetails, setPotDetails] = useState({
    shape: "",
    material: "",
    color: "",
    diameter: "",
    height: "",
    indoorOutdoor: "",
    weight: "",
  });

  const submitHandler = async(e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.entries(product).forEach(([key, value]) => {
      formData.append(key, value);
    });

    images.forEach((image) => {
      formData.append("images", image);
    });

    if(product.productType === "Plant") {
      formData.append("details", JSON.stringify(plantDetails));
    }

    if(product.productType === "Pot") {
      formData.append("details", JSON.stringify(potDetails));
    }

    
    try {
      const { data } = await API.post("/admin/add-product", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(data);
      alert("Product added successfully");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mb-6">
        <Link
          to="/admin/products"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={16} />
          Back to Products
        </Link>

        <h1 className="text-2xl font-semibold text-gray-900 mt-2">
          Add New Product
        </h1>
        <p className="text-sm text-gray-500">
          Fill in the details below to add a new product.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 max-w-5xl mx-auto">
        <form className="space-y-8" onSubmit={submitHandler}>
          <Section title="Basic Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Product name"
                value={product.name}
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })
                }
              />
              <Input
                placeholder="Title"
                value={product.title}
                onChange={(e) =>
                  setProduct({ ...product, title: e.target.value })
                }
              />
              <Input
                type="number"
                placeholder="Price"
                value={product.price}
                onChange={(e) =>
                  setProduct({ ...product, price: e.target.value })
                }
              />
              <Input
                type="number"
                placeholder="Stock"
                value={product.stock}
                onChange={(e) =>
                  setProduct({ ...product, stock: e.target.value })
                }
              />
            </div>
          </Section>

          <Section title="Product Type">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
              <select
                value={product.productType}
                onChange={(e) =>
                  setProduct({ ...product, productType: e.target.value })
                }
                className="input"
              >
                <option value="">Select product type</option>
                <option value="Plant">Plant</option>
                <option value="Pot">Pot</option>
              </select>

              <select
                className="input"
                value={product.size}
                onChange={(e) =>
                  setProduct({ ...product, size: e.target.value })
                }
              >
                <option value="">Select Size</option>
                <option value="small">small</option>
                <option value="medium">medium</option>
                <option value="large">large</option>
              </select>
            </div>
          </Section>

          <Section title="Description">
            <textarea
              rows={4}
              placeholder="Product description"
              className="input"
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
            />
          </Section>

          <Section title="Images">
            <input
              type="file"
              multiple

              className="input"
              onChange={(e) => setImages([...e.target.files])}
            />
            <p className="text-xs text-gray-500">
              Upload one or more product images
            </p>
          </Section>

          {product.productType === "Plant" && (
            <Section title="Plant Details">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Category"
                  value={plantDetails.category}
                  onChange={(e) =>
                    setPlantDetails({
                      ...plantDetails,
                      category: e.target.value,
                    })
                  }
                />
                <select
                className="input"
                value={plantDetails.water}
                onChange={(e) =>
                  setPlantDetails({ ...plantDetails, water: e.target.value })
                }
              >
                <option value="">Water requirement</option>
                <option value="light">Light</option>
                <option value="Medium">Medium</option>
                <option value="Heavy">Heavy</option>
              </select>

                <select
                className="input"
                value={plantDetails.light}
                onChange={(e) =>
                  setPlantDetails({ ...plantDetails, light: e.target.value })
                }
              >
                <option value="">Light requirement</option>
                <option value="Low Light">Low Light</option>
                <option value="Bright Sun">Bright Sun</option>
                <option value="Full Sun">Full Sun</option>
              </select>

                <select
                className="input"
                value={plantDetails.carelevel}
                onChange={(e) =>
                  setPlantDetails({ ...plantDetails, carelevel: e.target.value })
                }
              >
                <option value="">Care level</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Difficult">Difficult</option>
              </select>
                
                <Input
                  placeholder="Height (cm)"
                  value={plantDetails.height}
                  onChange={(e) =>
                    setPlantDetails({ ...plantDetails, height: e.target.value })
                  }
                />
                <select
                  className="input"
                  value={plantDetails.potIncluded}
                  onChange={(e) =>
                    setPlantDetails({
                      ...plantDetails,
                      potIncluded: e.target.value,
                    })
                  }
                >
                  <option>Pot included?</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
            </Section>
          )}

          {product.productType === "Pot" && (
            <Section title="Pot Details">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Shape"
                  value={potDetails.shape}
                  onChange={(e) =>
                    setPotDetails({ ...potDetails, shape: e.target.value })
                  }
                />
                <Input
                  placeholder="Material"
                  value={potDetails.material}
                  onChange={(e) =>
                    setPotDetails({ ...potDetails, material: e.target.value })
                  }
                />
                <Input
                  placeholder="Color"
                  value={potDetails.color}
                  onChange={(e) =>
                    setPotDetails({ ...potDetails, color: e.target.value })
                  }
                />
                <Input
                  placeholder="Diameter (cm)"
                  value={potDetails.diameter}
                  onChange={(e) =>
                    setPotDetails({ ...potDetails, diameter: e.target.value })
                  }
                />
                <Input
                  placeholder="Height (cm)"
                  value={potDetails.height}
                  onChange={(e) =>
                    setPotDetails({ ...potDetails, height: e.target.value })
                  }
                />
               <select
                className="input"
                value={potDetails.indoorOutdoor}
                onChange={(e) =>
                  setPotDetails({ ...potDetails, indoorOutdoor: e.target.value })
                }
              >
                <option value="">Indoor / Outdoor</option>
                <option value="Indoor">Indoor</option>
                <option value="Outdoor">Outdoor</option>
                <option value="Both">Both</option>
              </select>
                <Input
                  placeholder="Weight (kg)"
                  value={potDetails.weight}
                  onChange={(e) =>
                    setPotDetails({ ...potDetails, weight: e.target.value })
                  }
                />
              </div>
            </Section>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-end">
            <Link
              to="/admin/products"
              className="px-4 py-2 rounded-md border text-sm text-center"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-6 py-2 bg-emerald-700 text-white rounded-md text-sm font-semibold hover:bg-emerald-600 transition"
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Input = ({ type = "text", placeholder , value, onChange}) => (
  <input type={type} placeholder={placeholder} className="input" value={value} onChange={onChange} />
);

const Section = ({ title, children }) => (
  <div className="space-y-3">
    <h2 className="text-sm font-semibold text-gray-800">{title}</h2>
    {children}
  </div>
);

export default AddProduct;
