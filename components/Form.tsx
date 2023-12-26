import { useState } from "react";
import { useRouter } from "next/router";
import { mutate } from "swr";

interface FormData {
  region: string;
  category: string;
  items: string;
  menu_url: string;
}

interface Error {
  region?: string;
  category?: string;
  items?: string;
}

type Props = {
  formId: string;
  shopForm: FormData;
  forNewShop?: boolean;
};

const Form = ({ formId, shopForm, forNewShop = true }: Props) => {
  const router = useRouter();
  const contentType = "application/json";
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    region: shopForm.region,
    category: shopForm.category,
    items: shopForm.items,
    menu_url: shopForm.menu_url,
  });

  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (form: FormData) => {
    const { id } = router.query;

    try {
      const res = await fetch(`/api/shops/${id}`, {
        method: "PUT",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        sessionStorage.setItem("postSnackbar", "true");
        router.push("/");
      } else {
        sessionStorage.setItem("failSnackbar", "true");
        throw new Error(res.status.toString());
      }

      const { data } = await res.json();

      mutate(`/api/shops/${id}`, data, false); // Update the local data without a revalidation
      router.push("/");
    } catch (error: any) {
      sessionStorage.setItem("errorSnackbar", error.message);
      setMessage("新增項目失敗");
    }
  };

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (form: FormData) => {
    try {
      const res = await fetch("/api/shops", {
        method: "POST",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        sessionStorage.setItem("postSnackbar", "true");
        router.push("/");
      } else {
        sessionStorage.setItem("failSnackbar", "true");
        throw new Error(res.status.toString());
      }

      router.push("/");
    } catch (error: any) {
      sessionStorage.setItem("errorSnackbar", error.message);
      setMessage("新增項目失敗");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const formValidate = () => {
    let err: Error = {};
    if (!form.region) err.region = "地區為必填";
    if (!form.category) err.category = "分類為必填";
    if (!form.items) err.items = "項目為必填";
    return err;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = formValidate();

    if (Object.keys(errs).length === 0) {
      forNewShop ? postData(form) : putData(form);
    } else {
      setErrors({ errs });
    }
  };

  return (
    <>
      <form id={formId} onSubmit={handleSubmit}>
        <label htmlFor="region">地區 *</label>
        <input
          type="text"
          maxLength={20}
          name="region"
          value={form.region}
          onChange={handleChange}
          required
        />

        <label htmlFor="category">分類名稱 *</label>
        <input
          type="text"
          maxLength={20}
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        />

        <label htmlFor="items">項目名稱 *</label>
        <input
          type="text"
          maxLength={60}
          name="items"
          value={form.items}
          onChange={handleChange}
          required
        />

        <label htmlFor="menu_url">參考網址</label>
        <input
          type="url"
          name="menu_url"
          value={form.menu_url}
          onChange={handleChange}
        />

        <button type="submit" className="btn">
          送出
        </button>
      </form>
      <p>{message}</p>
      <div>
        {Object.keys(errors).map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </div>
    </>
  );
};

export default Form;
