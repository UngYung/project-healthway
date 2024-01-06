import React from "react";
import { GET_PHARMACY_ITEMS } from "../queries/pharmacyQueries";
import Spinner from "./Spinner";
import { useQuery } from "@apollo/client";
import { Chart } from "chart.js/auto";
import { Bar } from "react-chartjs-2";

export default function PharmacyChart() {
  const { loading, error, data } = useQuery(GET_PHARMACY_ITEMS);

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong</p>;

  let itemName = [];
  let itemQuantity = [];

  data.pharmacyItems.forEach((item) => {
    itemName.push(item.name);
    itemQuantity.push(item.quantity);
  });
  console.log(itemName);
  console.log(itemQuantity);

  return (
    <>
      <Bar
        data={{
          labels: [...itemName],
          datasets: [
            {
              label: "Pharmacy Chart",
              data: [...itemQuantity],
            },
          ],
        }}
      />
    </>
  );
}
