import React from 'react'
import { getCategories } from '../service/categories';
import { Icategories } from '../types/ctegories';
import Onecategory from './Onecategory';

export default async function Page() {
  const { data = [] } = await getCategories();

  return (
    <div className='flex flex-wrap gap-5 container mx-auto my-20 justify-center'>
      {data.map((category: Icategories) => (
        <Onecategory data={category} key={category._id} />
      ))}
    </div>
  )
}
