import React from "react";
import Card from "../common/Card";

export default function AdminTable({
    title,
    columns,
    children,
    right,
}: {
    title: string;
    columns: string[];
    children: React.ReactNode;
    right?: React.ReactNode;
}) {
    return (
        <Card>
            <div className="tableHead">
                <h3>{title}</h3>
                {right}
            </div>
            <div className="tableWrap">
                <table className="table">
                    <thead>
                        <tr>
                            {columns.map((c) => (
                                <th key={c}>{c}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>{children}</tbody>
                </table>
            </div>
        </Card>
    );
}
