import { Spin, Table, message } from "antd";
import { useEffect, useState } from "react";

const OrderPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const MY_STRIPE_SECRET_KEY = import.meta.env.VITE_API_STRIPE_SECRET_KEY;

  const columns = [
    {
      title: "Müşteri Email",
      dataIndex: "receipt_email",
    },
    {
      title: "Sipariş Fiyatı",
      dataIndex: "amount",
      render: (amount) => <b>${(amount / 100).toFixed(2)}</b>,
    },
    {
      title: "Durum",
      dataIndex: "status",
      render: (status) => <span>{status}</span>,
    },
    {
      title: "Oluşturulma Tarihi",
      dataIndex: "created",
      render: (created) => <span>{new Date(created * 1000).toLocaleString()}</span>,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          `https://api.stripe.com/v1/payment_intents`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${MY_STRIPE_SECRET_KEY}`,
            },
          }
        );

        if (response.ok) {
          const { data } = await response.json();
          setDataSource(data);
        } else {
          message.error("Veri getirme başarısız.");
        }
      } catch (error) {
        console.log("Veri hatası:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [MY_STRIPE_SECRET_KEY]);

  console.log(dataSource);

  return (
    <Spin spinning={loading}>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={(record) => record.id}
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </Spin>
  );
};

export default OrderPage;
