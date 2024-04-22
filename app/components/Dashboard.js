import Card from "./Card";

export default function Dashboard({ sims }) {
    return (
        <div className="px-4 pt-6 2xl:px-0 grid gap-4 xl:grid-cols-3">
            {sims.map((sim) => {
                return (
                    <div key={sim.id} className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                        <Card id={sim.id} />
                    </div>
                );
            })}
        </div>
    );
}
