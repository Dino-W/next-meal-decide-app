import Form from "../components/Form";

const NewShop = () => {
  const shopForm = {
    region: "",
    category: "",
    items: "",
    menu_url: "",
  };

  return <Form formId="add-shop-form" shopForm={shopForm} />;
};

export default NewShop;
