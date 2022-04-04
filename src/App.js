import React, { useState, useEffect } from 'react';
import './App.css';
import { Table } from 'antd';
import 'antd/dist/antd.css';

const BaseURL = "http://localhost:3000";

function App() {
  const [events, setEvents] = useState([]);

  const updateEvents = (data) => {
    const parsedData = JSON.parse(data);
    setEvents((events) => {
      if(!Array.isArray(parsedData)){
        return [...events, parsedData]
      } else {
        return parsedData
      }
    }
    );
  };

  useEffect(() => {
    const eventSource = new EventSource(`${BaseURL}/events`);
    eventSource.onmessage = (e) => updateEvents(e.data);
    return () => {
      eventSource.close();
    };
  }, []);
  const columns = [
	{
	  title: 'ID',
	  dataIndex: 'id',
	  key: 'id',
	},
	{
	  title: 'Info',
	  dataIndex: 'info',
	  key: 'info',
	},
	{
	  title: 'Source',
	  dataIndex: 'source',
	  key: 'source',
	},
  ];

  return (
    <div className="App" class="container">
		<h1>List of facts and sources</h1>
      <Table columns={columns} dataSource={events} />
    </div>
  );
}

export default App;
