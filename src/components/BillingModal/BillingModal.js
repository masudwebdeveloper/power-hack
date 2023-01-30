import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const BillingModal = ({setOpenModal, refetch}) => {
  const [isLoading, setIsLoading] = useState(true);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm();
  const handleBillingSubmit = (data) => {
    setIsLoading(true);
    const { name, email, number, amount } = data;
    const billId = Math.floor(Math.random() * 1000000) + 1;
    const billingData = {
      name,
      email,
      number,
      amount,
      billId,
    };
    console.log(name, email, number, amount, billId);
    fetch("http://localhost:5000/add-billing", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(billingData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          toast("bill adding successfully");
          setIsLoading(false);
          setOpenModal(false);
          refetch();
          reset();
        }
      })
      .catch((err) => {
        toast.error("add-billing error please check (console-log)");
        console.error(err.message);
      });
  };
  return (
    <div>
      <input type="checkbox" id="billingmodal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="billingmodal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <form onSubmit={handleSubmit(handleBillingSubmit)}>
            <div className="form-control w-full mt-3">
              <label className="label">
                <strong className="label-text">Full Name:</strong>
              </label>
              <input
                type="text"
                placeholder="full name"
                name="name"
                className={`input input-bordered w-full ${
                  errors.name &&
                  "focus:border-red-500 focus:ring-red-500 border-red-500"
                }`}
                {...register("name", { required: "This field is required" })}
              />
              {errors && (
                <span className="text-red-500">{errors.name?.message}</span>
              )}
            </div>
            <div className="form-control w-full">
              <label className="label">
                <strong className="label-text">Email:</strong>
              </label>
              <input
                type="email"
                placeholder="your email"
                name="email"
                className={`input input-bordered w-full ${
                  errors.email &&
                  "focus:border-red-500 focus:ring-red-500 border-red-500"
                }`}
                {...register("email", { required: "This field is required" })}
              />
              {errors && (
                <span className="text-red-500">{errors.email?.message}</span>
              )}
            </div>
            <div className="form-control w-full">
              <label className="label">
                <strong className="label-text">Number:</strong>
              </label>
              <input
                type="number"
                placeholder="type your number"
                name="number"
                className={`input input-bordered w-full ${
                  errors.number &&
                  "focus:border-red-500 focus:ring-red-500 border-red-500"
                }`}
                {...register("number", {
                  required: "This field is required",
                  maxLength: {
                    value: 11,
                    message: "maximum 11 digit number is acceptable",
                  },
                  minLength: {
                    value: 11,
                    message: "must be 11 digit number is acceptable",
                  },
                })}
              />
              {errors.number && (
                <span className="text-sm text-red-500">
                  {errors.number?.message}
                </span>
              )}
            </div>
            <div className="form-control w-full">
              <label className="label">
                <strong className="label-text">Payable amount:</strong>
              </label>
              <input
                type="number"
                placeholder="payable amount"
                name="amount"
                className={`input input-bordered w-full ${
                  errors.amount &&
                  "focus:border-red-500 focus:ring-red-500 border-red-500"
                }`}
                {...register("amount", { required: "This field is required" })}
              />
              {errors && (
                <span className="text-sm text-red-500">
                  {errors.amount?.message}
                </span>
              )}
            </div>
            <div className="form-control w-full mt-5">
              {isLoading ? (
                <input
                  type="submit"
                  value="submit"
                  className="btn bg-slate-800 text-slate-50 w-1/2 mx-auto"
                />
              ) : (
                <input
                  type="submit"
                  value="pending..."
                  readOnly
                  className="btn bg-slate-800 text-slate-50 w-1/2 mx-auto"
                />
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BillingModal;
