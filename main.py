# -*- encoding: utf-8 -*-
import requests

API_ENDPOINT = 'http://localhost:4000/invoice/state'

data = {
    "data": [
        {"data":{
        "userName": "amir",
        "email": "amir@wone.com",
        "password": "amirBoss472",
        "role": "superadmin",
        "phone": "+221774724175",
        "test": {
            "boss": "WONE",
            "role": "Amir"
        }
        }}
    ]
}

# option = {
#     "data": {
#             "name": "WONE",
#             "amir": "Boss",
#             "test": "for"
#         }
        
    
# }

response = requests.post(API_ENDPOINT, params=data)
print("Status code: "+ str(response.status_code))
print(response.text)

