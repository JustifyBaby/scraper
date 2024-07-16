"use client";

import { Custom } from "@/types";
import { useRef, useState } from "react";
import Label from "./Label";
import { hover } from "./css-function";

const Scraper = () => {
  const urlRef = useRef<HTMLInputElement>(null);
  const selectorRef = useRef<HTMLInputElement>(null);
  const fileNameRef = useRef<HTMLInputElement>(null);
  const fileTypeRef = useRef<HTMLSelectElement>(null);
  const downloadRef = useRef<HTMLAnchorElement>(null);

  const [data, setData] = useState<string[]>([]);

  const [select] = useState(hover("border", "border-yellow-500"));
  const [btn] = useState(hover("font-normal", "shadow-none"));

  const main = async () => {
    if (
      urlRef.current?.value === "" ||
      selectorRef.current?.value === "" ||
      fileNameRef.current?.value === "" ||
      !downloadRef.current
    )
      throw new Error();

    if (
      fileTypeRef.current!.value !== "txt" &&
      fileTypeRef.current!.value !== "json" &&
      fileTypeRef.current!.value !== "csv"
    )
      throw new Error();

    const body: Custom = {
      url: urlRef.current!.value,
      selector: selectorRef.current!.value,
    };

    const res = await fetch("http://localhost:3000/api/scrape", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const datas: string[] = await res.json();
    const jsonData = JSON.stringify(datas);
    const blob =
      fileTypeRef.current!.value === "csv"
        ? new Blob([jsonData], { type: "text/csv" })
        : new Blob([jsonData], { type: "text/json" });

    const objUrl = window.URL.createObjectURL(blob);

    downloadRef.current.setAttribute("href", objUrl);

    // aタグにdownload属性を設定する (第二引数はダウンロード時のファイル名)
    downloadRef.current.setAttribute(
      "download",
      `${fileNameRef.current!.value}.${fileTypeRef.current!.value}`
    );

    setData(datas);
  };

  return (
    <div id='app' className='flex flex-col justify-center items-center'>
      <div id='form' className='flex flex-col justify-center items-center m-3'>
        <div>
          <Label>URL：</Label>
          {/* <Input placeholder='Enter URL' ref={urlRef} /> */}
          <input placeholder='Enter URL' ref={urlRef} />
        </div>
        <div>
          <Label>セレクタ：</Label>
          {/* <Input placeholder='Enter HTML selector' ref={selectorRef} /> */}
          <input placeholder='Enter HTML selector' ref={selectorRef} />
        </div>
        <div>
          <Label>保存先のファイル名：</Label>
          {/* <Input placeholder='Download the retrieved data' ref={fileNameRef} /> */}
          <input placeholder='Download the retrieved data' ref={fileNameRef} />
          <select
            name='filetype'
            id='filetype'
            ref={fileTypeRef}
            className={`text-xl p-1 m-2 ${select}`}>
            <option value='txt'>txt</option>
            <option value='json'>json</option>
            <option value='csv'>csv</option>
          </select>
          <span className='text-gray-300 m-2 px-1'>← Data Type</span>
        </div>
        <button
          className={`text-xl ${btn} font-semibold p-2 px-8 m-3 shadow bg-sky-200`}
          onClick={async () => await main()}>
          実行
        </button>
      </div>
      <div>{JSON.stringify(data)}</div>
      <a ref={downloadRef} className='text-2xl text-blue-500'>
        Download
      </a>
    </div>
  );
};

export default Scraper;
