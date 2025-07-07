import React, { useEffect } from "react";
import "./styles.css";
import { HotelClass } from "../hotel-class";
import useSearchStore from "../../store/search-store";
import { useHotels } from "../../hooks/useHotels";
import { VscDebugBreakpointLog } from "react-icons/vsc";
import { useNavigate } from "react-router";
import { Hotel } from "~repo-shared";
import useCheckoutStore from "../../store/checkout-store";

export function HotelResultList() {
  const navigate = useNavigate();
  const {
    selectedLocation,
    setIsResult,
    isResult,
    resetSearch,
  } = useSearchStore();
  const resetCheckout = useCheckoutStore(state => state.resetCheckout)
  const setSelectedHotel = useCheckoutStore(state => state.setSelectedHotel)

  const { hotels, filterByCity, filteredHotelByCities } = useHotels();

  const onResetSearch = () => {
    resetSearch();
    setIsResult(false);
  };

  const onFindRoom = (hotel: Hotel) => {
    resetCheckout()
    setSelectedHotel(hotel);
    navigate("/checkout");
  };

  useEffect(() => {
    hotels.length > 0 && filterByCity(selectedLocation);
  }, [hotels, selectedLocation]);

  console.log('filteredHotelByCities', filteredHotelByCities)

  return (
    <div className="room-result-list-wrapper">
      {isResult && (
        <div className="reset-search" onClick={onResetSearch}>
          Reset Search
        </div>
      )}
      {hotels.length > 0 &&
        filteredHotelByCities.map((item, i) => (
          <div
            key={i}
            className="room-result-list-item"
            onClick={() => onFindRoom(item)}
          >
            <img src={item.images} className="list-item-image" />
            <div className="list-item-info-wrapper">
              <div className="hotel-title">{item.name}</div>
              <HotelClass star={item.classHotel} />
              <div>4.5/5.0 (1,000 reviews)</div>
              <div>
                <h3>Facilities</h3>
                <div className="grid-facilities">
                  {item.facilities.split(",").map((facility) => (
                    <div key={facility}>
                      <VscDebugBreakpointLog size={18} /> {facility}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="list-item-info-wrapper">
              <div className="row">
                <h2>${item.price}</h2>
                <p>/ night</p>
              </div>
              <div className="button-search" onClick={() => onFindRoom(item)}>
                Find Room
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
