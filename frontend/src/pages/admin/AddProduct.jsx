import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api/axios";

const AddProduct = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    title: "",
    description: "",
    productType: "",
  });

  const [variants, setVariants] = useState([
    { size: "", price: "", stock: "", color: "", height: "", width: "", diameter: "" }
  ]);

  const [images, setImages] = useState([]);

  const [plantDetails, setPlantDetails] = useState({
    category: "",
    water: "",
    light: "",
    carelevel: "",
    height: "",
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

  const [loading, setLoading] = useState(false);

  const addVariant = () => {
    setVariants([
      ...variants,
      { size: "", price: "", stock: "", color: "", height: "", width: "", diameter: "" },
    ]);
  };

  const removeVariant = (index) => {
    const updated = [...variants];
    updated.splice(index, 1);
    setVariants(updated);
  };

  const updateVariant = (index, key, value) => {
    const updated = [...variants];
    updated[index][key] = value;
    setVariants(updated);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", product.name);
    formData.append("title", product.title);
    formData.append("description", product.description);
    formData.append("productType", product.productType);

    formData.append("variants", JSON.stringify(variants));

    if (product.productType === "Plant") {
      formData.append("details", JSON.stringify(plantDetails));
    }

    if (product.productType === "Pot") {
      formData.append("details", JSON.stringify(potDetails));
    }

    images.forEach((img) => {
      formData.append("images", img);
    });

    try {
      setLoading(true);

      await API.post("/admin/add-product", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Product added successfully");
      navigate("/admin/products");
    } catch (err) {
      console.log(err);
      alert("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* Header */}

      <div className="max-w-5xl mx-auto mb-6">
        <Link
          to="/admin/products"
          className="flex items-center gap-2 text-gray-600 hover:text-black"
        >
          <ArrowLeft size={18} /> Back
        </Link>

        <h1 className="text-2xl font-bold mt-3">Add Product</h1>
        <p className="text-gray-500 text-sm">
          Fill the details to add a new product
        </p>
      </div>

      {/* Form */}

      <div className="bg-white border rounded-xl p-6 max-w-5xl mx-auto">

        <form onSubmit={submitHandler} className="space-y-8">

          {/* Basic Info */}

          <Section title="Basic Information">
            <Grid>
              <Input
                placeholder="Product Name"
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
            </Grid>

            <textarea
              className="input"
              rows={4}
              placeholder="Description"
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
            />
          </Section>

          {/* Product Type */}

          <Section title="Product Type">
            <select
              className="input"
              value={product.productType}
              onChange={(e) =>
                setProduct({ ...product, productType: e.target.value })
              }
            >
              <option value="">Select Type</option>
              <option value="Plant">Plant</option>
              <option value="Pot">Pot</option>
            </select>
          </Section>

          {/* Variants */}

          <Section title="Variants">
            {variants.map((variant, index) => (
              <div key={index} className="border p-4 rounded-lg mb-4">
                <Grid>

                  <Input
                    placeholder="Size"
                    value={variant.size}
                    onChange={(e) =>
                      updateVariant(index, "size", e.target.value)
                    }
                  />

                  <Input
                    type="number"
                    placeholder="Price"
                    value={variant.price}
                    onChange={(e) =>
                      updateVariant(index, "price", e.target.value)
                    }
                  />

                  <Input
                    type="number"
                    placeholder="Stock"
                    value={variant.stock}
                    onChange={(e) =>
                      updateVariant(index, "stock", e.target.value)
                    }
                  />

                  <Input
                    placeholder="Color"
                    value={variant.color}
                    onChange={(e) =>
                      updateVariant(index, "color", e.target.value)
                    }
                  />

                  <Input
                    placeholder="Height"
                    value={variant.height}
                    onChange={(e) =>
                      updateVariant(index, "height", e.target.value)
                    }
                  />

                  <Input
                    placeholder="Width"
                    value={variant.width}
                    onChange={(e) =>
                      updateVariant(index, "width", e.target.value)
                    }
                  />

                  <Input
                    placeholder="Diameter"
                    value={variant.diameter}
                    onChange={(e) =>
                      updateVariant(index, "diameter", e.target.value)
                    }
                  />
                </Grid>

                {variants.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeVariant(index)}
                    className="text-red-500 text-sm mt-2"
                  >
                    Remove Variant
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={addVariant}
              className="bg-gray-200 px-4 py-2 rounded text-sm"
            >
              + Add Variant
            </button>
          </Section>

          {/* Images */}

          <Section title="Product Images">
            <input
              type="file"
              multiple
              className="input"
              onChange={(e) => setImages([...e.target.files])}
            />
          </Section>

          {/* Plant Details */}

          {product.productType === "Plant" && (
            <Section title="Plant Details">
              <Grid>

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

                <Input
                  placeholder="Water"
                  value={plantDetails.water}
                  onChange={(e) =>
                    setPlantDetails({
                      ...plantDetails,
                      water: e.target.value,
                    })
                  }
                />

                <Input
                  placeholder="Light"
                  value={plantDetails.light}
                  onChange={(e) =>
                    setPlantDetails({
                      ...plantDetails,
                      light: e.target.value,
                    })
                  }
                />

                <Input
                  placeholder="Care Level"
                  value={plantDetails.carelevel}
                  onChange={(e) =>
                    setPlantDetails({
                      ...plantDetails,
                      carelevel: e.target.value,
                    })
                  }
                />

              </Grid>
            </Section>
          )}

          {/* Pot Details */}

          {product.productType === "Pot" && (
            <Section title="Pot Details">
              <Grid>

                <Input
                  placeholder="Material"
                  value={potDetails.material}
                  onChange={(e) =>
                    setPotDetails({
                      ...potDetails,
                      material: e.target.value,
                    })
                  }
                />

                <Input
                  placeholder="Shape"
                  value={potDetails.shape}
                  onChange={(e) =>
                    setPotDetails({
                      ...potDetails,
                      shape: e.target.value,
                    })
                  }
                />

                <Input
                  placeholder="Weight"
                  value={potDetails.weight}
                  onChange={(e) =>
                    setPotDetails({
                      ...potDetails,
                      weight: e.target.value,
                    })
                  }
                />

              </Grid>
            </Section>
          )}

          {/* Submit */}

          <div className="flex justify-end gap-3">
            <Link
              to="/admin/products"
              className="px-4 py-2 border rounded"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-600"
            >
              {loading ? "Saving..." : "Save Product"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

const Input = ({ type = "text", placeholder, value, onChange }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="input"
  />
);

const Section = ({ title, children }) => (
  <div className="space-y-3">
    <h2 className="text-lg font-semibold">{title}</h2>
    {children}
  </div>
);

const Grid = ({ children }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
);

export default AddProduct;