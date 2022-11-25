
public class openCageData{
	public results[] results;
	public status status;
public class results {
		public components components;
		public Integer confidence;	//10
		public String formatted;	//Design Offices, Philipsbornstraße 2, 30165 Hanover, Germany
		public geometry geometry;
	}
public class components {
		
		public String city;	//Hanover
		public String continent;	//Europe
		public String country;	//Germany
		public String country_code;	//de
		public String postcode;	//30165
		public String road;	//Philipsbornstraße
		public String state;	//Lower Saxony
		public String suburb;	//Vahrenwald
	}
public class geometry {
		public Double lat;	//52.387783
		public Double lng;	//9.7334394
	}
public class status {
		public Integer code;	//200
		public String message;	//OK
	}
	
}