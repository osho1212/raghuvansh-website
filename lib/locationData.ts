export interface StateCitiesMap {
  [state: string]: string[];
}

export const locationData: StateCitiesMap = {
  "Delhi NCR": [
    "New Delhi",
    "Noida",
    "Greater Noida",
    "Gurugram",
    "Ghaziabad",
    "Faridabad"
  ],
  "Maharashtra": [
    "Mumbai",
    "Pune",
    "Nagpur",
    "Thane",
    "Nashik",
    "Navi Mumbai",
    "Aurangabad",
    "Kolhapur"
  ],
  "Karnataka": [
    "Bengaluru",
    "Mysuru",
    "Mangaluru",
    "Hubli-Dharwad",
    "Belagavi",
    "Udupi"
  ],
  "Uttar Pradesh": [
    "Lucknow",
    "Kanpur",
    "Varanasi",
    "Agra",
    "Prayagraj",
    "Meerut",
    "Bareilly",
    "Aligarh",
    "Gorakhpur"
  ],
  "West Bengal": [
    "Kolkata",
    "Howrah",
    "Darjeeling",
    "Siliguri",
    "Asansol",
    "Durgapur"
  ],
  "Bihar": [
    "Patna",
    "Gaya",
    "Muzaffarpur",
    "Bhagalpur",
    "Darbhanga",
    "Purnia"
  ],
  "Tamil Nadu": [
    "Chennai",
    "Coimbatore",
    "Madurai",
    "Trichy",
    "Salem",
    "Tirunelveli"
  ],
  "Telangana": [
    "Hyderabad",
    "Warangal",
    "Nizamabad",
    "Khammam",
    "Karimnagar"
  ],
  "Gujarat": [
    "Ahmedabad",
    "Surat",
    "Vadodara",
    "Rajkot",
    "Gandhinagar",
    "Bhavnagar"
  ],
  "Rajasthan": [
    "Jaipur",
    "Jodhpur",
    "Udaipur",
    "Kota",
    "Bikaner",
    "Ajmer"
  ],
  "Punjab": [
    "Amritsar",
    "Ludhiana",
    "Jalandhar",
    "Patiala",
    "Bathinda"
  ],
  "Haryana": [
    "Ambala",
    "Panipat",
    "Karnal",
    "Sonipat",
    "Rohtak",
    "Hisar"
  ],
  "Madhya Pradesh": [
    "Bhopal",
    "Indore",
    "Jabalpur",
    "Gwalior",
    "Ujjain"
  ],
  "Kerala": [
    "Kochi",
    "Thiruvananthapuram",
    "Kozhikode",
    "Thrissur",
    "Kollam"
  ],
  "Other / Outside India": [
    "Custom Location"
  ]
};

export const statesList = Object.keys(locationData);
