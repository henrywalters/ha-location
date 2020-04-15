# HaDev Core
## Location Microservice

### Description
Provides a small set of utilities to lookup and interact with locations.

### Usage

#### Search
##### Description
Searches a location either by ip or coordinates
##### URL
/location/search
##### HTTP Method
Get
##### Parameters
ip, coordinates
##### Example
/location/search?coordinates=42.231398,-83.689472
``
{
    "country": "United States",
    "county": "Washtenaw County",
    "region": "Michigan",
    "city": "Ann Arbor",
    "address": "3525 East Ellsworth Road",
    "areaCode": "48108",
    "areaCodeSuffix": "2035",
    "id": "0eeebbbd-26aa-45f2-88a9-708264993083"
}
``