import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import BillingModal from "../BillingModal/BillingModal";
import EditBillingModal from "../EditBillingModal/EditBillingModal";

const BillingPage = () => {
  const [billingData, setBillingData] = useState(null);
  const [openModal, setOpenModal] = useState(true);
  const [allBill, setAllBill] = useState([]);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  console.log(search);
  const { data: billingList = [], refetch } = useQuery({
    queryKey: ["billingList", page, search],
    queryFn: async () => {
      const res = await fetch(
        `https://power-hack-server-lovat.vercel.app/billing-list?size=${10}&page=${page}&search=${search}`
      );
      const data = await res.json();
      return data;
    },
  });

  const pages = Math.ceil(billingList.count / 10);

  const handleDelete = (id) => {
    fetch(`https://power-hack-server-lovat.vercel.app/delete-billing/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success("deleted successfully");
          refetch();
        }
      })
      .catch((err) => {
        toast.error(`billing data deleting error ${err.message}`);
      });
  };
  useEffect(() => {
    fetch("https://power-hack-server-lovat.vercel.app/total-paid")
      .then((res) => res.json())
      .then((data) => {
        setAllBill(data);
      })
      .catch((err) => console.error(err.message));
  }, [billingList]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    setSearch(name);
    e.target.reset();
  };
  const paidTotal = allBill.reduce((accumulator, bill) => {
    return accumulator + parseInt(bill.amount);
  }, 0);
  return (
    <main className="lg:max-w-[1340px] mx-auto">
      <div className="navbar bg-base-200 my-10">
        <div className="flex-1 gap-2">
          <h1>Billing: </h1>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <input
                type="text"
                placeholder="Search by name"
                name="name"
                className="input input-bordered"
              />
            </div>
          </form>
        </div>
        <div className="navbar-center mr-[500px]">
          <h1>
            <strong>Paid Total: {paidTotal}</strong>
          </h1>
        </div>
        <div className="flex-none">
          <label
            htmlFor="billingmodal"
            onClick={() => setOpenModal(true)}
            className="btn normal-case text-xl text-slate-50 bg-gray-800"
          >
            Add New Bill
          </label>
        </div>
      </div>
      <div className="overflow-hidden overflow-x-auto rounded-lg border border-gray-200 mb-10">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                <div className="flex items-center gap-2">
                  Bill ID
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-700"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                <div className="flex items-center gap-2">
                  Full Name
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-700"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                <div className="flex items-center gap-2">
                  Email
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-700"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                <div className="flex items-center gap-2">
                  Phone
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-700"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                <div className="flex items-center gap-2">
                  Paid Amount
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-700"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {billingList.billList.map((bill) => (
              <tr key={bill._id}>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {bill?.billId}
                </td>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {bill?.name}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {bill?.email}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {bill?.number}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {bill?.amount}
                </td>
                <td className="whitespace-nowrap px-4 py-2">
                  <label
                    onClick={() => setBillingData(bill)}
                    htmlFor="editmodal"
                    className="btn btn-sm rounded bg-green-500 px-3 py-1.5 text-xs font-medium text-slate-50"
                  >
                    Edit
                  </label>
                  :
                  <button
                    onClick={() => handleDelete(bill?._id)}
                    className="btn btn-sm rounded bg-red-100 px-3 py-1.5 text-xs font-medium text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-center mb-10">
        {[...Array(pages).keys()].map((i) => (
          <button key={i} onClick={() => setPage(i)}>
            <span
              className={` ${
                page === i ? "bg-red-500" : ""
              } hover:bg-red-500 mr-2 bg-gray-500 p-2 rounded-sm text-slate-50`}
            >
              {i + 1}
            </span>
          </button>
        ))}
      </div>
      {openModal && (
        <BillingModal
          refetch={refetch}
          setOpenModal={setOpenModal}
        ></BillingModal>
      )}
      {billingData && (
        <EditBillingModal
          refetch={refetch}
          billingData={billingData}
          setBillingData={setBillingData}
        ></EditBillingModal>
      )}
    </main>
  );
};

export default BillingPage;
