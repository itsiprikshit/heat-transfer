import moment from "moment";

export default function Card({ id }) {
    let href = `/simulation/${id}`;

    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <div className="flex-shrink-0">
                    <span className="text-xl font-bold leading-none text-gray-900 dark:text-white">My sim #{id}</span>
                    <h3 className="text-base font-light text-gray-500 dark:text-gray-400">{moment().format("MMM Do, YYYY")}</h3>
                </div>
            </div>
            <div id="main-chart"></div>
            <div className="flex items-center justify-end pt-3 mt-4 border-t border-gray-200 sm:pt-6 dark:border-gray-700">
                <div className="flex-shrink-0">
                    <a
                        href={href}
                        className="inline-flex items-center p-2 text-xs font-medium uppercase rounded-lg text-primary-700 sm:text-sm hover:bg-gray-100 dark:text-primary-500 dark:hover:bg-gray-700"
                    >
                        View
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </a>
                </div>
            </div>
        </>
    );
}
