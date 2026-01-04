import "./assets/app.css";
import { useState } from "react";
import { useForm } from "react-hook-form";

// Form Without External Library
const WithoutLibrary = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const form = e.target;

      const payload = {
        id: crypto.randomUUID(),
        name: form.name.value.trim(),
        description: form.description.value.trim() || null,
        price: Number(form.price.value),
        compareAtPrice: null,
        sku: null,
        barcode: form.barcode.value.trim() || null,
        quantity: Number(form.quantity.value),
        category: form.category.value.trim() || null,
        tags: form.tags.value.trim() || null,
        images: "", // placeholder (API expects string)
        featured: form.featured.checked,
        published: form.published.checked,
        isDefault: null,
        owner: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const res = await fetch("https://api.oluwasetemi.dev/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(data);
        setMessage("Failed to create product");
        return;
      }

      setMessage("Product created successfully ✅");
      console.log(payload)
      form.reset();
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Product</h2>

      <input
        name="name"
        type="text"
        placeholder="Product Name"
        required
        minLength={1}
        maxLength={500}
      />

      <input
        name="price"
        type="number"
        placeholder="Enter a Price"
        min="0"
        required
      />

      <input name="barcode" type="text" placeholder="Barcode (optional)" />

      <input name="category" type="text" placeholder="Category" />

      <textarea name="description" placeholder="Description" />

      <label>
        <input type="checkbox" name="featured" />
        Featured
      </label>

      {/* Image upload UI only (not yet sent to API) */}
      <label>
        Product Images
        <input name="images" type="file" accept="image/*" multiple />
      </label>

      <input
        name="quantity"
        type="number"
        min="0"
        placeholder="Quantity"
        required
      />

      <input name="tags" type="text" placeholder="Tags (comma separated)" />

      <label>
        <input type="checkbox" name="published" defaultChecked />
        Published
      </label>

      <button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Product"}
      </button>

      {message && <p>{message}</p>}
    </form>
  );
};

// Form With React Library
const WithReactHookForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmit = async (formData) => {
    setLoading(true);
    setMessage("");

    try {
      const payload = {
        id: crypto.randomUUID(),
        name: formData.name.trim(),
        description: formData.description?.trim() || null,
        price: Number(formData.price),
        compareAtPrice: null,
        sku: null,
        barcode: formData.barcode?.trim() || null,
        quantity: Number(formData.quantity),
        category: formData.category?.trim() || null,
        tags: formData.tags?.trim() || null,
        images: "", // placeholder (API expects string)
        featured: !!formData.featured,
        published: !!formData.published,
        isDefault: null,
        owner: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const res = await fetch("https://api.oluwasetemi.dev/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(data);
        setMessage("Failed to create product");
        return;
      }

      setMessage("Product created successfully ✅");
      console.log(payload);
      reset();
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Create Product</h2>

      <input
        {...register("name", {
          required: "Product name is required",
          minLength: 1,
          maxLength: 500
        })}
        type="text"
        placeholder="Product Name"
      />
      {errors.name && <p>{errors.name.message}</p>}

      <input
        {...register("price", {
          required: "Price is required",
          min: 0
        })}
        type="number"
        placeholder="Enter a Price"
      />
      {errors.price && <p>{errors.price.message}</p>}

      <input
        {...register("barcode")}
        type="text"
        placeholder="Barcode (optional)"
      />

      <input
        {...register("category")}
        type="text"
        placeholder="Category"
      />

      <textarea
        {...register("description")}
        placeholder="Description"
      />

      <label>
        <input type="checkbox" {...register("featured")} />
        Featured
      </label>

      {/* UI-only image input */}
      <label>
        Product Images
        <input
          type="file"
          accept="image/*"
          multiple
          {...register("images")}
        />
      </label>

      <input
        {...register("quantity", {
          required: "Quantity is required",
          min: 0
        })}
        type="number"
        placeholder="Quantity"
      />
      {errors.quantity && <p>{errors.quantity.message}</p>}

      <input
        {...register("tags")}
        type="text"
        placeholder="Tags (comma separated)"
      />

      <label>
        <input
          type="checkbox"
          {...register("published")}
          defaultChecked
        />
        Published
      </label>

      <button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Product"}
      </button>

      {message && <p>{message}</p>}
    </form>
  );
};

// Create root Component
const App = () => {
  return (
    <div className="container">
      <div className="parent">
        <WithoutLibrary />
        <WithReactHookForm />
      </div>
    </div>
  );
};

// Assignment by ============> Ibukunola Mabawonku(Mareola-Mabs)

export default App;