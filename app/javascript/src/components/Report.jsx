import React, { useEffect, useState } from "react";
import { useMemo } from "react";

import { Download } from "@bigbinary/neeto-icons";
import { Typography, Button } from "@bigbinary/neetoui/v2";
import { useTable } from "react-table";

import reportsApi from "../apis/report";
import usersApi from "../apis/user";

const Report = () => {
  const [reportList, setReportList] = useState([]);
  const [generateReport, setGenerateReport] = useState(false);
  const data = useMemo(() => reportList, [reportList]);
  const [jobId, setJobId] = useState(0);
  const [download, setDownload] = useState(false);
  const columns = useMemo(
    () => [
      {
        Header: "Quiz name",
        accessor: "quiz_name",
      },
      {
        Header: "User Name",
        accessor: "userName",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Correct Answers",
        accessor: "correct_answers_count",
      },
      {
        Header: "Incorrect Answers",
        accessor: "incorrect_answers_count",
      },
    ],
    []
  );
  useEffect(() => {
    fetchDetails();
  }, []);
  const fetchDetails = async () => {
    try {
      const response = await usersApi.list();
      const data = response.data.Report.map(item => {
        item.userName = `${item.first_name} ${item.last_name}`;
        return item;
      });
      setReportList(data);
    } catch (error) {
      logger.error(error);
    }
  };

  const handleReport = async () => {
    setGenerateReport(true);
    try {
      const response = await reportsApi.exportData();
      setJobId(() => response.data.jid);
      var intervalName = "job_" + response.data.jid;
      window[intervalName] = setInterval(() => {
        getExportJobStatus(response.data.jid, intervalName);
      }, 1000);
    } catch (error) {
      logger.error(error);
    }
  };

  const getExportJobStatus = async (job_id, intervalName) => {
    try {
      const response = await reportsApi.exportStatus({ job_id });
      if (response.data.status == "complete") {
        setTimeout(function () {
          clearInterval(window[intervalName]);
          delete window[intervalName];
          setDownload(true);
        }, 500);
      }
    } catch (error) {
      logger.error(error);
    }
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <div className="w-full mt-10 mb-10">
      <div className="p-10 flex justify-between">
        <Typography style="h1" className="text-gray-500" weight="bold">
          {" "}
          Reports{" "}
        </Typography>
        <Button
          label="Download"
          icon={Download}
          iconPosition="left"
          onClick={handleReport}
        />
      </div>
      {!generateReport && (
        <div>
          <table
            className="shadow-lg border-4 bg-white w-9/12 mx-auto"
            {...getTableProps()}
          >
            <thead>
              {headerGroups.map((headerGroup, index) => (
                <tr key={index + 1} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, index) => (
                    <th
                      className="bg-blue-100 border text-left px-8 py-4"
                      key={index}
                      {...column.getHeaderProps()}
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="border-4" {...getTableBodyProps()}>
              {rows.map((row, i) => {
                prepareRow(row);
                return (
                  <tr className="border-4" key={i} {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      return (
                        <td
                          className="border-4 p-5"
                          key={row?.original?.id}
                          {...cell.getCellProps()}
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {generateReport && (
        <div>
          {!download && (
            <Typography>
              Your report is being prepared for downloading
            </Typography>
          )}
          {download && jobId && (
            <a href={`/export_download/${jobId}`} download>
              button
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default Report;
