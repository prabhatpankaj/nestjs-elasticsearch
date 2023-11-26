# Refrences

* https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-types.html


* https://www.elastic.co/guide/en/elasticsearch/reference/current/nested.html

```

PUT cars
{
  "settings": {
    "analysis": {
      "tokenizer": {
        "autocomplete": {
          "type": "edge_ngram",
          "min_gram": 2,
          "max_gram": 10,
          "token_chars": ["letter", "digit"]
        }
      },
      "analyzer": {
        "autocomplete": {
          "type": "custom",
          "tokenizer": "autocomplete",
          "filter": ["lowercase"]
        }
      }
    }
  },
  "mappings": {
    "properties": {
      "make": {
        "type": "text",
        "analyzer": "autocomplete",
        "search_analyzer": "standard"
      },
      "makeId": {
        "type": "keyword"
      },
      "slug": {
        "type": "keyword"
      },
      "image": {
        "type": "keyword"
      }
      ,
      "models": {
        "type": "nested",
        "properties": {
          "name": {
            "type": "text",
            "analyzer": "autocomplete",
            "search_analyzer": "standard"
          },
          "slug": {
            "type": "keyword"
          },
          "modelId": {
            "type": "keyword"
          },
          "variants": {
            "type": "nested",
            "properties": {
              "name": {
                "type": "text",
                "analyzer": "autocomplete",
                "search_analyzer": "standard"
              },
              "variantId": {
                "type": "keyword"
              },
              "slug": {
                "type": "keyword"
              }
            }
          },
          "colours": {
            "type": "nested",
            "properties": {
              "ColorName": {
                "type": "text",
                "analyzer": "autocomplete",
                "search_analyzer": "standard"
              },
              "colourId": {
                "type": "keyword"
              },
              "colourCode": {
                "type": "keyword"
              }
            }
          }
        }
      }
    }
  }
}

PUT cars/_mapping
{
  "properties": {
    "slug": {
        "type": "keyword"
      },
    "image": {
      "type": "keyword"
    }
  }
}

GET cars/_mapping


DELETE cars

POST /cars/_doc/1
{
    "make": "Ford",
    "makeId": 1,
    "slug": "ford",
    "image": "https://cars24-newcar.s3.ap-southeast-1.amazonaws.com/ford_logo_1234567890abcdef1234567890abcdef_b260804872.jpg",
    "models": [
        {
            "name": "Mustang",
            "modelId": 15,
            "slug": "mustang",
            "variants": [
                {
                    "variantId": 21,
                    "name": "EcoBoost",
                    "slug": "ecoboost"
                },
                {
                    "variantId": 25,
                    "name": "GT",
                    "slug": "gt"
                },
                {
                    "variantId": 27,
                    "name": "Shelby GT350",
                    "slug": "shelby-gt350"
                }
            ],
            "colours": [
                {
                    "colourId": 36,
                    "ColorName": "Oxford White",
                    "ColorCode": "#FFFFFF"
                },
                {
                    "colourId": 37,
                    "ColorName": "Race Red",
                    "ColorCode": "#FF0000"
                },
                {
                    "colourId": 38,
                    "ColorName": "Shadow Black",
                    "ColorCode": "#000000"
                },
                {
                    "colourId": 39,
                    "ColorName": "Velocity Blue",
                    "ColorCode": "#001E40"
                }
            ]
        },
        {
            "name": "Explorer",
            "modelId": 23,
            "slug": "explorer",
            "variants": [
                {
                    "variantId": 32,
                    "name": "XLT",
                    "slug": "xlt"
                },
                {
                    "variantId": 35,
                    "name": "Limited",
                    "slug": "limited"
                },
                {
                    "variantId": 38,
                    "name": "ST",
                    "slug": "st"
                }
            ],
            "colours": [
                {
                    "colourId": 46,
                    "ColorName": "Agate Black Metallic",
                    "ColorCode": "#24292E"
                },
                {
                    "colourId": 47,
                    "ColorName": "Ingot Silver Metallic",
                    "ColorCode": "#BFC3C7"
                },
                {
                    "colourId": 48,
                    "ColorName": "Atlas Blue Metallic",
                    "ColorCode": "#001E40"
                },
                {
                    "colourId": 49,
                    "ColorName": "Rapid Red Metallic Tinted Clearcoat",
                    "ColorCode": "#FF3355"
                }
            ]
        }
    ]
}

POST /cars/_doc/2
{
    "make": "Honda",
    "makeId": 2,
    "slug": "honda",
    "image": "https://cars24-newcar.s3.ap-southeast-1.amazonaws.com/honda_logo_1234567890abcdef1234567890abcdef_b260804872.jpg",
    "models": [
        {
            "name": "Civic",
            "modelId": 18,
            "slug": "civic",
            "variants": [
                {
                    "variantId": 28,
                    "name": "LX",
                    "slug": "lx"
                },
                {
                    "variantId": 31,
                    "name": "EX",
                    "slug": "ex"
                },
                {
                    "variantId": 34,
                    "name": "Touring",
                    "slug": "touring"
                }
            ],
            "colours": [
                {
                    "colourId": 56,
                    "ColorName": "Platinum White Pearl",
                    "ColorCode": "#FFFFFF"
                },
                {
                    "colourId": 57,
                    "ColorName": "Modern Steel Metallic",
                    "ColorCode": "#495A64"
                },
                {
                    "colourId": 58,
                    "ColorName": "Cosmic Blue Metallic",
                    "ColorCode": "#1F3943"
                },
                {
                    "colourId": 59,
                    "ColorName": "Rallye Red",
                    "ColorCode": "#FF0000"
                }
            ]
        },
        {
            "name": "CR-V",
            "modelId": 27,
            "slug": "cr-v",
            "variants": [
                {
                    "variantId": 39,
                    "name": "LX",
                    "slug": "lx"
                },
                {
                    "variantId": 42,
                    "name": "EX",
                    "slug": "ex"
                },
                {
                    "variantId": 45,
                    "name": "Touring",
                    "slug": "touring"
                }
            ],
            "colours": [
                {
                    "colourId": 66,
                    "ColorName": "Obsidian Blue Pearl",
                    "ColorCode": "#0D2238"
                },
                {
                    "colourId": 67,
                    "ColorName": "Lunar Silver Metallic",
                    "ColorCode": "#A1A7B0"
                },
                {
                    "colourId": 68,
                    "ColorName": "Modern Steel Metallic",
                    "ColorCode": "#495A64"
                },
                {
                    "colourId": 69,
                    "ColorName": "Radiant Red Metallic",
                    "ColorCode": "#8B001B"
                }
            ]
        }
    ]
}

POST /cars/_doc/3
{
    "make": "Chevrolet",
    "makeId": 3,
    "slug": "chevrolet",
    "image": "https://cars24-newcar.s3.ap-southeast-1.amazonaws.com/chevrolet_logo_1234567890abcdef1234567890abcdef_b260804872.jpg",
    "models": [
        {
            "name": "Camaro",
            "modelId": 21,
            "slug": "camaro",
            "variants": [
                {
                    "variantId": 33,
                    "name": "LS",
                    "slug": "ls"
                },
                {
                    "variantId": 36,
                    "name": "LT",
                    "slug": "lt"
                },
                {
                    "variantId": 39,
                    "name": "SS",
                    "slug": "ss"
                }
            ],
            "colours": [
                {
                    "colourId": 76,
                    "ColorName": "Summit White",
                    "ColorCode": "#FFFFFF"
                },
                {
                    "colourId": 77,
                    "ColorName": "Red Hot",
                    "ColorCode": "#C8102E"
                },
                {
                    "colourId": 78,
                    "ColorName": "Black",
                    "ColorCode": "#0A0A0A"
                },
                {
                    "colourId": 79,
                    "ColorName": "Riverside Blue Metallic",
                    "ColorCode": "#1F3943"
                }
            ]
        },
        {
            "name": "Equinox",
            "modelId": 29,
            "slug": "equinox",
            "variants": [
                {
                    "variantId": 46,
                    "name": "L",
                    "slug": "l"
                },
                {
                    "variantId": 49,
                    "name": "LS",
                    "slug": "ls"
                },
                {
                    "variantId": 52,
                    "name": "Premier",
                    "slug": "premier"
                }
            ],
            "colours": [
                {
                    "colourId": 86,
                    "ColorName": "Summit White",
                    "ColorCode": "#FFFFFF"
                },
                {
                    "colourId": 87,
                    "ColorName": "Nightfall Gray Metallic",
                    "ColorCode": "#1F3943"
                },
                {
                    "colourId": 88,
                    "ColorName": "Silver Ice Metallic",
                    "ColorCode": "#BFC3C7"
                },
                {
                    "colourId": 89,
                    "ColorName": "Cajun Red Tintcoat",
                    "ColorCode": "#AA0A0F"
                }
            ]
        }
    ]
}

POST /cars/_doc/4
{
    "make": "Nissan",
    "makeId": 4,
    "slug": "nissan",
    "image": "https://cars24-newcar.s3.ap-southeast-1.amazonaws.com/nissan_logo_1234567890abcdef1234567890abcdef_b260804872.jpg",
    "models": [
        {
            "name": "Altima",
            "modelId": 24,
            "slug": "altima",
            "variants": [
                {
                    "variantId": 37,
                    "name": "S",
                    "slug": "s"
                },
                {
                    "variantId": 40,
                    "name": "SV",
                    "slug": "sv"
                },
                {
                    "variantId": 43,
                    "name": "SL",
                    "slug": "sl"
                }
            ],
            "colours": [
                {
                    "colourId": 96,
                    "ColorName": "Brilliant Silver Metallic",
                    "ColorCode": "#BFC3C7"
                },
                {
                    "colourId": 97,
                    "ColorName": "Gun Metallic",
                    "ColorCode": "#2C2C2C"
                },
                {
                    "colourId": 98,
                    "ColorName": "Scarlet Ember Tintcoat",
                    "ColorCode": "#AA0A0F"
                },
                {
                    "colourId": 99,
                    "ColorName": "Storm Blue Metallic",
                    "ColorCode": "#1F3943"
                }
            ]
        },
        {
            "name": "Rogue",
            "modelId": 31,
            "slug": "rogue",
            "variants": [
                {
                    "variantId": 55,
                    "name": "S",
                    "slug": "s"
                },
                {
                    "variantId": 58,
                    "name": "SV",
                    "slug": "sv"
                },
                {
                    "variantId": 61,
                    "name": "SL",
                    "slug": "sl"
                }
            ],
            "colours": [
                {
                    "colourId": 106,
                    "ColorName": "Glacier White",
                    "ColorCode": "#FFFFFF"
                },
                {
                    "colourId": 107,
                    "ColorName": "Magnetic Black Pearl",
                    "ColorCode": "#1F3943"
                },
                {
                    "colourId": 108,
                    "ColorName": "Gun Metallic",
                    "ColorCode": "#2C2C2C"
                },
                {
                    "colourId": 109,
                    "ColorName": "Scarlet Ember Tintcoat",
                    "ColorCode": "#AA0A0F"
                }
            ]
        }
    ]
}

POST /cars/_doc/5
{
    "make": "Subaru",
    "makeId": 5,
    "slug": "subaru",
    "image": "https://cars24-newcar.s3.ap-southeast-1.amazonaws.com/subaru_logo_1234567890abcdef1234567890abcdef_b260804872.jpg",
    "models": [
        {
            "name": "Outback",
            "modelId": 30,
            "slug": "outback",
            "variants": [
                {
                    "variantId": 47,
                    "name": "Premium",
                    "slug": "premium"
                },
                {
                    "variantId": 50,
                    "name": "Limited",
                    "slug": "limited"
                },
                {
                    "variantId": 53,
                    "name": "Touring",
                    "slug": "touring"
                }
            ],
            "colours": [
                {
                    "colourId": 116,
                    "ColorName": "Crystal White Pearl",
                    "ColorCode": "#F7F7F7"
                },
                {
                    "colourId": 117,
                    "ColorName": "Abyss Blue Pearl",
                    "ColorCode": "#1F3943"
                },
                {
                    "colourId": 118,
                    "ColorName": "Magnetite Gray Metallic",
                    "ColorCode": "#495A64"
                },
                {
                    "colourId": 119,
                    "ColorName": "Crimson Red Pearl",
                    "ColorCode": "#AA0A0F"
                }
            ]
        },
        {
            "name": "Forester",
            "modelId": 32,
            "slug": "forester",
            "variants": [
                {
                    "variantId": 64,
                    "name": "Base",
                    "slug": "base"
                },
                {
                    "variantId": 67,
                    "name": "Premium",
                    "slug": "premium"
                },
                {
                    "variantId": 70,
                    "name": "Touring",
                    "slug": "touring"
                }
            ],
            "colours": [
                {
                    "colourId": 126,
                    "ColorName": "Crystal White Pearl",
                    "ColorCode": "#F7F7F7"
                },
                {
                    "colourId": 127,
                    "ColorName": "Jasper Green Metallic",
                    "ColorCode": "#4E5935"
                },
                {
                    "colourId": 128,
                    "ColorName": "Horizon Blue Pearl",
                    "ColorCode": "#1F3943"
                },
                {
                    "colourId": 129,
                    "ColorName": "Crimson Red Pearl",
                    "ColorCode": "#AA0A0F"
                }
            ]
        }
    ]
}

GET /cars/_search

GET /cars/_search
{
  "query": {
    "bool": {
      "should": [
        {
          "nested": {
            "path": "models",
            "query": {
              "bool": {
                "should": [
                  {
                    "nested": {
                      "path": "models.colours",
                      "query": {
                        "match": {
                          "models.colours.name": {
                            "query": "red",
                            "fuzziness": "auto"
                          }
                        }
                      }
                    }
                  }
                ]
              }
            }
          }
        }
      ]
    }
  }
}


```

* search example

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Car Auto-Suggest</title>
  <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
</head>
<body>

<label for="carInput">Search for a Car:</label>
<input type="text" id="carInput">

<div id="suggestions"></div>

<script>
$(document).ready(function() {
  $('#carInput').on('input', function() {
    var inputValue = $(this).val().toLowerCase();

    // Perform an AJAX request to Elasticsearch for auto-suggestions
    $.ajax({
      url: 'car/_search', // Replace with your Elasticsearch endpoint
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        "query": {
          "bool": {
            "should": [
              {
                "match": {
                  "make": {
                    "query": inputValue,
                    "fuzziness": "auto"
                  }
                }
              },
              {
                "nested": {
                  "path": "models",
                  "query": {
                    "bool": {
                      "should": [
                        {
                          "match": {
                            "models.name": {
                              "query": inputValue,
                              "fuzziness": "auto"
                            }
                          }
                        },
                        {
                          "nested": {
                            "path": "models.variants",
                            "query": {
                              "match": {
                                "models.variants.name": {
                                  "query": inputValue,
                                  "fuzziness": "auto"
                                }
                              }
                            }
                          }
                        },
                        {
                          "nested": {
                            "path": "models.colours",
                            "query": {
                              "match": {
                                "models.colours.name": {
                                  "query": inputValue,
                                  "fuzziness": "auto"
                                }
                              }
                            }
                          }
                        }
                      ]
                    }
                  }
                }
              }
            ]
          }
        }
      }),
      success: function(data) {
        displaySuggestions(data.hits.hits);
      }
    });
  });

  function displaySuggestions(suggestions) {
    var suggestionsDiv = $('#suggestions');
    suggestionsDiv.empty();

    suggestions.forEach(function(hit) {
      var make = hit._source.make;
      var modelName = hit._source.models[0].name; // Assuming the first model is relevant
      var variant = hit._source.models[0].variants[0].name; // Assuming the first variant is relevant
      var colour = hit._source.models[0].colours[0].name; // Assuming the first color is relevant

      var suggestionText = make + ' ' + modelName + ' ' + variant + ' ' + colour;
      suggestionsDiv.append('<div>' + suggestionText + '</div>');
    });
  }
});
</script>

</body>
</html>


```
