import React, { useState } from "react"
import { AsyncPaginate } from "react-select-async-paginate"
import { geoApiOptions, GEO_API_URL } from "../../api"

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null)

  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            // 将每个城市的经纬度和名称和国家代码组成一个对象作为返回结果中options数组中的一项
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            }
          }),
        }
      })
  }

  const handleOnChange = (searchData) => {
    setSearch(searchData)
    onSearchChange(searchData)
  }

  return (
    <AsyncPaginate
      // AsyncPaginate组件用于渲染具有异步加载选项的下拉列表，通常用于搜索和选择城市等场景
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    // 异步加载选项数据的函数
    />
  )
}

export default Search
