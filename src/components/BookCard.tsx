interface IBookProps {
    title: string;
    category: string;
    authors: string[];
    image: string;
}

function Book({ title, category, authors, image }: IBookProps) {
    return (
        <>
            <div
                className="card py-2"
                style={{ width: "15rem", height: "20rem" }}
            >
                <div className="" style={{ width: "15rem", height: "13rem" }}>
                    <img
                        alt={""}
                        src={image}
                        className="shadow d-block  mx-auto my-auto"
                    />
                </div>

                <div className="card-body overflow-hidden">
                    <h6 className="">{title}</h6>
                    <p className="mb-0">{authors}</p>
                    <p className="mb-0 text-muted">{category}</p>
                </div>
            </div>
        </>
    );
}
export default Book;
