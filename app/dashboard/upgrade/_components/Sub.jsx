"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useState } from "react";

function Sub({ isPro }) {
  const [loading, setLoading] = useState(false);
  const handleSubscription = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/stripe");
      console.log(res);
      window.location.href = res.data.url;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      className="w-full mt-3"
      disabled={loading}
      onClick={handleSubscription}
    >
      {isPro ? "Manage Subscription" : "Get Pro"}
    </Button>
  );
}

export default Sub;
