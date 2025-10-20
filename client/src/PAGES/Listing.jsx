import React,{useState, useMemo} from 'react'
import { useSearchParams } from 'react-router-dom'
import Item from '../components/Item'
import { dummyCars } from '../assets/data'

const Listing = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    bodyType: [],
    priceRanger: []
  })

  const [selectSort, setSelectSort] = useState('')
  const [currPage, setCurrPage] = useState(1)
  const itemsPerPage = 6
  const curency = "$"

  const [searchQuery, setSearchQuery] = useState('')

  const [searchParams] = useSearchParams();
  const heroDestination = (searchParams.get("destination")?.toLowerCase() || "").toLowerCase().trim();


  const sortOptions = ["Relevant", "Low to High", "High to Low"];

  const bodyType = [
    "Coupe",
    "SUV",
    "Hatchback",
    "Sedan",
    "Convertible",
    "Van",
    "Grand Tourer",
  ];

  const priceRanger =[
    "0 to 20,000",
    "20,000 to 30,000",
    "30,000 to 50,000",
    "50,000 to 99,000",
  ];

  // Filtering and Sorting Logic
  const handleFilterChange = (checked, value, type ) => {
    setSelectedFilters((prev) =>{
      const updated = {...prev}
      if(checked){
        updated[type].push(value)
      } else {
        updated[type] = updated[type].filter((v) => v !== value)
      }
      return updated
    })
  }

  // Sorting Function
  const sortCars = (a,b) => {
    if(selectSort === "Low to High"){
      return a.price.sale - b.price.sale
    } else if (selectSort === "High to Low"){
      return b.price.sale - a.price.sale
    }
    return 0
  }
  // PRICE FILTERS
   const matchesPrice = (car) =>{
    if(selectedFilters.priceRanger.length === 0 ) return true;
    return selectedFilters.priceRanger.some((range) => {
      const [min, max] = range.split(" to ").map(str => parseInt(str.replace(/,/g, '')));
      return car.price.sale >= min && car.price.sale <= max;
    })
   }

  //Type Filter
   const matchesType = (car) => {
    if(selectedFilters.bodyType.length === 0 ) return true;
    return selectedFilters.bodyType.includes(car.bodyType);
   }

  //  Search Filter using header's searchQuery
  const matchesSearch = (car) => {
    if(!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return(
      car.title.toLowerCase().includes(query) ||
      car.city.toLowerCase().includes(query) ||
      car.country.toLowerCase().includes(query)
    )
  }

  // Hero Destination Filter(from Hero form -> /listing?Destination=....)
  const matchesDestinationFilter = (car) => {
    if(!heroDestination) return true;
    return(car.city || "").toLowerCase().includes(heroDestination)
  }

  // Filtered & Sorted Cars
  const filteredCars = useMemo(() =>{
    return dummyCars.filter((c) =>
    matchesType(c) &&
    matchesPrice(c) &&
    matchesSearch(c) &&
    matchesDestinationFilter(c)
    ).sort(sortCars) 
  }, [dummyCars, selectedFilters, selectSort, searchQuery, heroDestination]);



  return (
    <div className='bg-primary'>
      <div className='max-padd-container !px-0 mt-18 pb-16'>
      {/* CONTAINER */}
        <div className='flex flex-col sm:flex-row gap-6'>
          {/* FILTERS-LEFT SIDE */}
          <div className='min-w-72 bg-white p-4 pl-6 lg:pl-12 
          rounded-r-xl my-4'>
            {/* SORT By Price */}
            <div className='py-3'>
              <h5 className='mb-3'>Sort by</h5>
              <select value={selectSort} onChange={(e)=>setSelectSort(e.target.value)} className='bg-primary ring-1 ring-slate-900/10 outline-none text-gray-30 text-sm font-semibold
            text-gray-50 h-8 w-full rounded px-2'>
                {sortOptions.map((sort, index) =>(
                  <option key={index} value={sort}>{sort}</option>
                ))}
              </select>
            </div>
            {/* Car Type */}
            <div className='pt-5 mt-5 bg-primary rounded-xl'>
              <h5 className='mb-4'>Car Type</h5>
                {bodyType.map((type) =>(
                  <label key={type} className={'flex gap-2 text-sm font-semibold text-gray-50 mb-1'}>
                  <input type="checkbox" className='ml-2' checked={selectedFilters.bodyType.includes(type)} onChange={(e) => handleFilterChange(e.target.checked,type, "bodyType")}/>
                    {type}
                  </label>
                ))}
            </div>
            {/* Price RANGE */}
            <div className='pt-5 mt-5 bg-primary rounded-xl'>
              <h5 className='mb-4'>Price Range</h5>
                {priceRanger.map((price) =>(
                  <label key={price} className={'flex gap-2 text-sm font-semibold text-gray-50 mb-1'}>
                  <input type='checkbox' className='ml-2' checked={selectedFilters.priceRanger.includes(price)} onChange={(e) => handleFilterChange(e.target.checked, price, "priceRanger")}/>
                    {curency}{price}
                  </label>
                ))}
            </div>
          </div>
          {/* ITEMS FILTERS -RIGHT SIDE */}
          <div className='max-sm:px-10 sm:pr-10 bg-white p-4 rounded-l-xl my-4'>
            <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8'>
              {filteredCars.length > 0 ? (
                filteredCars.map((car) => (
                  <Item key={car} car={car}/>
                ))
              ): (
                <p className='capitalize'>No Cars found!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Listing