# Refrences

* https://www.elastic.co/guide/en/elasticsearch/reference/current/nested.html


```
PUT one_to_many
{
  "mappings": {
    "properties": {
      "user": {
        "type": "nested"
       , "properties": {
         "tickets":{
            "type": "nested"
         }
       }
      }
    }
  }
}

DELETE one_to_many

GET one_to_many/_search

DELETE one_to_many

GET one_to_many/_mapping

PUT one_to_many/_doc/1
{
   "org":"msft",
   "user":[
      {
         "first":"Soumil",
         "last":"Shah",
         "tickets":[
            {
               "ticket_number":1
            }
         ]
      },
      {
         "first":"Nitin",
         "last":"Shah",
         "tickets":[
            {
               "ticket_number":1
            },
             {
               "ticket_number":121212
            }
         ]
      }
   ]
}

PUT one_to_many/_doc/2
{
   "org":"amazon",
   "user":[
      {
         "first":"Raj",
         "last":"Shah",
         "tickets":[
            {
               "ticket_number":1234
            }
         ]
      },
      {
         "first":"soumil",
         "last":"Shah",
         "tickets":[
            {
               "ticket_number":12345
            }
         ]
      }
   ]
}


#------------------------------
# Give me documents where ORG is MSFT
# ------------------------------
GET one_to_many/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "org": "msft"
          }
        }
      ]
    }
  }
}


#------------------------------
# Give me  all tickets for user soumil 
# ------------------------------
GET one_to_many/_search
{
  "_source": "org", 
  "query": {
    "nested": {
      "path": "user",
      "query": {
        "bool": {
          "must": [{ "match_phrase": { "user.first": "soumil" }}]
        }
      },
      "inner_hits": {
        "_source": "user.tickets.ticket_number"
      }
    }
  }
}

GET one_to_many/_search
{
  "_source": "org", 
  "query": {
    "nested": {
      "path": "user",
      "query": {
        "bool": {
          "must": [{ "match_phrase": { "user.first": "soumil" }}]
        }
      },
      "inner_hits": {
        
      }
    }
  }
}

#------------------------------
# Give me  all Users who are assigned ticket 1
# ------------------------------
GET one_to_many/_search
{
   "_source":"",
   "query":{
      "nested":{
         "path":"user",
         "query":{
            "nested":{
               "path":"user.tickets",
               "query":{
                  "match_phrase":{
                     "user.tickets.ticket_number":"1"
                  }
               }
            }
         },
         "inner_hits":{
            "_source": ["user.first"]
         }
      }
   }
}


#------------------------------
# Give me  all user in msft and tickets is 1
# ------------------------------

GET one_to_many/_search
{
   "_source":"",
   "query": {
     "bool": {
       "must": [
         {
          "match": {
            "org": "msft"
          }
        },
         {
      "nested":{
         "path":"user",
         "query":{
            "nested":{
               "path":"user.tickets",
               "query":{
                  "match":{
                     "user.tickets.ticket_number":"1"
                  }
               }
            }
         },
         "inner_hits":{
             "_source": ["user.first"]
         }
      }
   }
       ]
     }
   }
}

```
