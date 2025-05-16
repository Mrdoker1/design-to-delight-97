import React from "react";
import Sidebar from "../components/exercise/Sidebar";
import Navbar from "../components/exercise/Navbar";
import Breadcrumbs from "../components/exercise/Breadcrumbs";
import ExerciseHeader from "../components/exercise/ExerciseHeader";
import InstructionForm from "../components/exercise/InstructionForm";
import ResourceBundle from "../components/exercise/ResourceBundle";

const breadcrumbItems = [
  { label: "Complete German" },
  { label: "Beginner A1" },
  { label: "Introductions" },
  { label: "Vocabulary" },
  { label: "Flashcard", active: true },
];

const Exercise26: React.FC = () => {
  return (
    <div
      className="shadow-[0px_4px_0px_0px_#D6DEE6,4px_1px_14px_0px_#D6DEE6] overflow-hidden bg-white"
    >
      <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
        <div className="w-1/5 max-md:w-full max-md:ml-0">
          <Sidebar />
        </div>
        <div
          className="w-4/5 ml-5 max-md:w-full max-md:ml-0"
        >
          <div className="flex w-full flex-col items-stretch max-md:max-w-full">
            <Navbar />
            <main className="self-center flex w-[900px] max-w-full flex-col items-stretch mt-10">
              <Breadcrumbs items={breadcrumbItems} />
              <div className="w-full mt-14 max-md:mt-10">
                <ExerciseHeader 
                  title="Flashcard" 
                  id="exercis..." 
                  isLive={true} 
                />
                <div className="w-full mt-6">
                  <InstructionForm 
                    initialInstruction="Look, something new!" 
                    showToUsers={false} 
                  />
                  <ResourceBundle />
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exercise26;
