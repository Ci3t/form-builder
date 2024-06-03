import { Button } from "@/components/ui/button";
import React from "react";
import CreateForm from "./_components/CreateForm";
import Forms from "./_components/Forms";

const Dashboard = () => {
  return (
    <div className="p-10">
      <h2 className="font-bold text-2xl flex items-center justify-between">
        Dashboard
        <CreateForm />
      </h2>
      {/* Forms */}

      <Forms />
    </div>
  );
};

export default Dashboard;
