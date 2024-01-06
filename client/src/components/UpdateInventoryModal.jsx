import { useState } from "react";
import { FaPills } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { GET_PHARMACY_ITEMS } from "../queries/pharmacyQueries";
import { UPDATE_PHARMACY_ITEM } from "../mutations/pharmacyMutations";
import { useQuery } from "@apollo/client";

export default function UpdateInventoryModal() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");

  const [updatePharmacyItem] = useMutation(UPDATE_PHARMACY_ITEM, {
    variables: { name, quantity },
    update(cache, { data: { updatePharmacyItem } }) {
      const { items } = cache.readQuery({ query: GET_PHARMACY_ITEMS });
      cache.writeQuery({
        query: GET_PHARMACY_ITEMS,
        data: { items: [...items, updatePharmacyItem] },
      });
    },
  });

  const { loading, error, data } = useQuery(GET_PHARMACY_ITEMS);

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === "" || quantity === "") {
      return alert("Please fill in all fields");
    }
    updatePharmacyItem(name, quantity);
    setName("");
    setQuantity("");
  };

  if (loading) return null;
  if (error) return "Something went wrong";

  return (
    <>
      <button
        type="button"
        className="btn btn-secondary"
        data-bs-toggle="modal"
        data-bs-target="#updateInventoryModal"
      >
        <div className="d-flex align-items-center">
          <FaPills className="icon" />
          <div>Update Inventory</div>
        </div>
      </button>

      <div
        className="modal fade"
        id="updateInventoryModal"
        aria-labelledby="updateInventoryModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="updateInventoryModalLabel">
                Update Inventory
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <select
                    className="form-select"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  >
                    <option value="">Select Item</option>
                    {data.pharmacyItems.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Quantity</label>
                  <input
                    type="number"
                    className="form-control"
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  data-bs-dismiss="modal"
                  className="btn btn-secondary"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
