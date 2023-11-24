# Refrences

* https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-types.html


* https://www.elastic.co/guide/en/elasticsearch/reference/current/nested.html

```

DELETE cars

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
      "make_id": {
        "type": "keyword"
      },
      "models": {
        "type": "nested",
        "properties": {
          "name": {
            "type": "text",
            "analyzer": "autocomplete",
            "search_analyzer": "standard"
          },
          "model_id": {
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
              "variant_id": {
                "type": "keyword"
              }
            }
          },
          "colours": {
            "type": "nested",
            "properties": {
              "name": {
                "type": "text",
                "analyzer": "autocomplete",
                "search_analyzer": "standard"
              },
              "colour_id": {
                "type": "keyword"
              }
            }
          }
        }
      }
    }
  }
}


POST /cars/_doc/1
{
  "make": "Toyota",
  "make_id": "toyota_1",
  "models": [
    {
      "name": "Camry",
      "model_id": "camry_1",
      "variants": [
        {"name": "LE", "variant_id": "le_1"},
        {"name": "XSE", "variant_id": "xse_1"}
      ],
      "colours": [
        {"name": "Red", "colour_id": "red_1"},
        {"name": "Blue", "colour_id": "blue_1"},
        {"name": "Silver", "colour_id": "silver_1"}
      ]
    },
    {
      "name": "Corolla",
      "model_id": "corolla_1",
      "variants": [
        {"name": "SE", "variant_id": "se_1"},
        {"name": "XLE", "variant_id": "xle_1"}
      ],
      "colours": [
        {"name": "White", "colour_id": "white_1"},
        {"name": "Black", "colour_id": "black_1"}
      ]
    }
  ]
}

POST /cars/_doc/2
{
  "make": "Ford",
  "make_id": "ford_1",
  "models": [
    {
      "name": "Mustang",
      "model_id": "mustang_1",
      "variants": [
        {"name": "GT", "variant_id": "gt_1"},
        {"name": "Ecoboost", "variant_id": "ecoboost_1"}
      ],
      "colours": [
        {"name": "Yellow", "colour_id": "yellow_1"},
        {"name": "Black", "colour_id": "black_2"}
      ]
    },
    {
      "name": "Fusion",
      "model_id": "fusion_1",
      "variants": [
        {"name": "SE", "variant_id": "se_2"},
        {"name": "Hybrid", "variant_id": "hybrid_1"}
      ],
      "colours": [
        {"name": "Blue", "colour_id": "blue_2"},
        {"name": "Silver", "colour_id": "silver_2"}
      ]
    }
  ]
}

POST /cars/_doc/3
{
  "make": "Honda",
  "make_id": "honda_1",
  "models": [
    {
      "name": "Civic",
      "model_id": "civic_1",
      "variants": [
        {"name": "EX", "variant_id": "ex_1"},
        {"name": "Touring", "variant_id": "touring_1"}
      ],
      "colours": [
        {"name": "Red", "colour_id": "red_2"},
        {"name": "White", "colour_id": "white_2"}
      ]
    },
    {
      "name": "Accord",
      "model_id": "accord_1",
      "variants": [
        {"name": "Sport", "variant_id": "sport_1"},
        {"name": "Hybrid", "variant_id": "hybrid_2"}
      ],
      "colours": [
        {"name": "Gray", "colour_id": "gray_1"},
        {"name": "Black", "colour_id": "black_3"}
      ]
    }
  ]
}

POST /cars/_doc/4
{
  "make": "Chevrolet",
  "make_id": "chevrolet_1",
  "models": [
    {
      "name": "Cruze",
      "model_id": "cruze_1",
      "variants": [
        {"name": "LT", "variant_id": "lt_1"},
        {"name": "Premier", "variant_id": "premier_1"}
      ],
      "colours": [
        {"name": "Silver", "colour_id": "silver_3"},
        {"name": "Black", "colour_id": "black_4"}
      ]
    },
    {
      "name": "Malibu",
      "model_id": "malibu_1",
      "variants": [
        {"name": "LS", "variant_id": "ls_1"},
        {"name": "Hybrid", "variant_id": "hybrid_3"}
      ],
      "colours": [
        {"name": "Blue", "colour_id": "blue_3"},
        {"name": "Red", "colour_id": "red_4"}
      ]
    }
  ]
}

POST /cars/_doc/5
{
  "make": "Volkswagen",
  "make_id": "volkswagen_1",
  "models": [
    {
      "name": "Jetta",
      "model_id": "jetta_1",
      "variants": [
        {"name": "SE", "variant_id": "se_3"},
        {"name": "GLI", "variant_id": "gli_1"}
      ],
      "colours": [
        {"name": "White", "colour_id": "white_3"},
        {"name": "Gray", "colour_id": "gray_2"}
      ]
    },
    {
      "name": "Passat",
      "model_id": "passat_1",
      "variants": [
        {"name": "R-Line", "variant_id": "r_line_1"},
        {"name": "SEL", "variant_id": "sel_1"}
      ],
      "colours": [
        {"name": "Black", "colour_id": "black_5"},
        {"name": "Silver", "colour_id": "silver_4"}
      ]
    }
  ]
}


GET cars/_search


GET /cars/_search
{
  "query": {
    "bool": {
      "should": [
        {
          "match": {
            "make": {
              "query": "toyo",
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
                        "query": "cam",
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
                            "query": "le",
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
