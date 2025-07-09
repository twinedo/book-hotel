import React, { useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router";
import useUserStore from "../../store/user-store";
import { useHistory } from "../../hooks/useHistory";
import { BookingCard } from "../../components/booking-card";
import { cancelBooking } from "../../services/api/history";
import useCheckoutStore from "../../store/checkout-store";
import useSearchStore from "../../store/search-store";

export function RenderDashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const { user, setUser, setIsLoggedIn, setToken } = useUserStore();
  const { resetCheckout } = useCheckoutStore();
  const { resetSearch } = useSearchStore();
  const { history: pastHistory, isLoading: isLoadingPastHistory } = useHistory(
    user?.email ?? "",
    "past"
  );

  const {
    history: upcomingHistory,
    refetch,
    isLoading: isLoadingUpcomingHistory,
  } = useHistory(user?.email ?? "", "upcoming");

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const onCancelBooking = (bookingId: string) => {
    cancelBooking(bookingId, user?.email ?? "").then((res) => {
      if (res) {
        refetch();
      }
    });
  };

  const onLogout = () => {
    setUser(undefined)
    setIsLoggedIn(false)
    setToken('')
    resetCheckout()
    resetSearch()
    navigate("/auth")
  }

  return (
    <div
      className={`dashboard ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}
    >
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h3>{user?.fullName}</h3>
        </div>

        <div className="sidebar-menu">
          <button
            className={`menu-item ${activeMenu === "dashboard" ? "active" : ""}`}
            onClick={() => setActiveMenu("dashboard")}
          >
            Dashboard
          </button>
        </div>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <button className="toggle-sidebar" onClick={toggleSidebar}>
          {sidebarOpen ? "◀" : "▶"}
        </button>

        {activeMenu === "dashboard" && (
          <div className="dashboard-grid">
            <div className="grid-column">
              <h2>Upcoming Booking Hotel</h2>
              <div className="content-placeholder">
                {/* Your upcoming bookings content would go here */}
                {isLoadingUpcomingHistory && <div>Loading...</div>}
                {upcomingHistory.length === 0 && <p>No upcoming bookings</p>}
                {!isLoadingUpcomingHistory && upcomingHistory.length > 0 && (
                  <div>
                    {upcomingHistory.map((booking) => (
                      <BookingCard
                        key={booking.id}
                        booking={booking}
                        variant="upcoming"
                        onCancel={(bookingId: string) =>
                          onCancelBooking(bookingId)
                        }
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="grid-column">
              <h2>Past Booked Hotel</h2>
              <div className="content-placeholder">
                {/* Your past bookings content would go here */}
                {isLoadingPastHistory && <div>Loading...</div>}
                {pastHistory.length === 0 && <p>No past bookings</p>}
                {!isLoadingPastHistory && pastHistory.length > 0 && (
                  <div>
                    {pastHistory.map((booking) => (
                      <BookingCard
                        key={booking.id}
                        booking={booking}
                        variant="past"
                      />
                    ))}
                    <div></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
