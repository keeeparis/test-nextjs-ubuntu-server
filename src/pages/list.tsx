import { GetServerSideProps } from 'next';
import Image from 'next/image';
import React from 'react';

const BASE_API = process.env.NEXT_PUBLIC_BASE_API;
const API = `${BASE_API}/api`;

interface ListProps {
  data: {
    data: {
      id: number;
      attributes: {
        Name: string;
        Url: string;
        Image: {
          data: {
            id: number;
            attributes: {
              name: string;
              url: string;
              width: number;
              height: number;
            }
          }
        }
      }
    }[],
    meta: {
      pagination: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
      }
    }
  }
}

const List = ({ data }: ListProps) => {
  console.log(data)
  return (
    <div>
      <h1>List of data</h1>
      {data.data.map(supermarket => {
        return (
          <div key={supermarket.id}>
            <h2>{supermarket.attributes.Name}</h2>
            <p>{supermarket.attributes.Url}</p>
            <Image src={`${BASE_API}${supermarket.attributes.Image.data.attributes.url}`} alt={supermarket.attributes.Image.data.attributes.name} width={supermarket.attributes.Image.data.attributes.width} height={supermarket.attributes.Image.data.attributes.height} />
          </div>
        )
      })}
    </div>
  )
}

export default List;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  console.log(BASE_API)
  console.log(API)
  const response = await fetch(`${API}/supermarkets?populate=*`);
  const data = await response.json();

  return {
    props: {
      data
    }
  }
}