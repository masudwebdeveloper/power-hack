import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const EditBillingModal = ({billingData, setBillingData, refetch}) => {
    const {name, email, number, amount, billId, _id} = billingData;
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
    const billingData = {
      name,
      email,
      number,
      amount,
      billId,
    };
    console.log(name, email, number, amount, billId);
    fetch(`http://localhost:5000/update-billing/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(billingData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
            setBillingData(null);
            refetch();
            reset();
            setIsLoading(false);
        }
      })
      .catch((err) => {
        toast.error("add-billing error please check (console-log)");
        console.error(err.message);
      });
  };
  return (
    <div>
      <input type="checkbox" id="editmodal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="editmodal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <form onSubmit={handleSubmit(handleBillingSubmit)}>
            <div className="form-control w-full mt-3">
              <label className="label">
                <strong className="label-text">Bill Id:</strong>
              </label>
              <input
                type="text"
                name="billid"
                readOnly
                defaultValue={billId}
                className={`input input-bordered w-full ${
                  errors.billId &&
                  "focus:border-red-500 focus:ring-red-500 border-red-500"
                }`}
                {...register("billid", { required: "This field is required" })}
              />
              {errors && (
                <span className="text-red-500">{errors.billId?.message}</span>
              )}
            </div>
            <div className="form-control w-full mt-3">
              <label className="label">
                <strong className="label-text">Full Name:</strong>
              </label>
              <input
                type="text"
                placeholder="full name"
                name="name"
                defaultValue={name}
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
                defaultValue={email}
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
                defaultValue={number}
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
                defaultValue={amount}
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
                  value="save"
                  className="btn bg-green-500 text-slate-50 w-1/2 mx-auto"
                />
              ) : (
                <input
                  type="submit"
                  value="pending..."
                  readOnly
                  className="btn bg-slate-600 text-slate-50 w-1/2 mx-auto"
                />
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBillingModal;
