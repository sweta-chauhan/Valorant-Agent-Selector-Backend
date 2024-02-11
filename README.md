# Valorant-Agent-Selection

#### Backend Service 
Deployed On *RENDERON*
`https://valorant-6lfk.onrender.com`

----
#### Back-End API Contract
----
* Roles Lisitng API
  *URL Suffix* : `/api/roles`
  *Response* 
    ```
    {
        "roles": [
        "Initiator",
        "Sentinel",
        "Duelist",
        "Controller"
    ],
    "success": true
    }
    ```
-----
* AngentList
   *URL Suffix* : `api/agents?role={roldId}&playerId={playerId}`
   *query params*
    - role filter
          - anyOf  `["Initiator","Sentinel","Duelist","Controller"]`
          - default will list all agents having role object
    - playerId
   *Response*
    ```
    {
    "agents": [
        {
            "agentId": "e370fa57-4757-3604-3648-499e1f642d3f",
            "agentName": "Gekko",
            "bustPortrait": "https://media.valorant-api.com/agents/e370fa57-4757-3604-3648-499e1f642d3f/fullportrait.png",
            "fullPortrait": "https://media.valorant-api.com/agents/e370fa57-4757-3604-3648-499e1f642d3f/fullportrait.png",
            "background": "https://media.valorant-api.com/agents/e370fa57-4757-3604-3648-499e1f642d3f/background.png",
            "backgroundGradientColors": [
                "c7f458ff",
                "d56324ff",
                "3a2656ff",
                "3a7233ff"
            ],
            "agentImageURL": "https://media.valorant-api.com/agents/e370fa57-4757-3604-3648-499e1f642d3f/displayicon.png",
            "role": {
                "displayName": "Initiator",
                "displayIcon": "https://media.valorant-api.com/agents/roles/1b47567f-8f7b-444b-aae3-b0c634622d10/displayicon.png"
            },
            "isLocked": true,
            "lockedBy": "e195b61e-2dc9-42f6-aaec-48243d1ac9d5"
        }
    ],
    "success": true
    }
    ```

-----
* Add Player : POST
    *URL Suffix* : `/api/add-player`
    *Response*
    ```
    {
        "data": {
        "playerId": "10810a49-96b3-42fa-88af-1a69682a3789",
        "profileImage": "https://media.valorant-api.com/agents/7f94d92c-4234-0a36-9646-3a87eb8b5c89/displayicon.png",
        "games": [],
        "agentSelectionMeta": {}
    },
    "success": true
    }
    ```

----

* Get Player : UID in path
  *URL Suffix* : `/api/player/:playerId` 
  *Response*: 
    ```
    {
    "data": {
        "playerId": "10810a49-96b3-42fa-88af-1a69682a3789",
        "games": [
            "e370fa57-4757-3604-3648-499e1f642d3f",
            "8e253930-4c05-31dd-1b6c-968525494517",
            "a3bfb853-43b2-7238-a4f1-ad90e9e46bcc",
            "8e253930-4c05-31dd-1b6c-968525494517",
            "a3bfb853-43b2-7238-a4f1-ad90e9e46bcc",
            "8e253930-4c05-31dd-1b6c-968525494517",
            "a3bfb853-43b2-7238-a4f1-ad90e9e46bcc",
            "7f94d92c-4234-0a36-9646-3a87eb8b5c89",
            "bb2a4828-46eb-8cd1-e765-15848195d751"
        ],
        "agentSelectionMeta": {
            "e370fa57-4757-3604-3648-499e1f642d3f": 1,
            "8e253930-4c05-31dd-1b6c-968525494517": 3,
            "a3bfb853-43b2-7238-a4f1-ad90e9e46bcc": 3,
            "7f94d92c-4234-0a36-9646-3a87eb8b5c89": 1,
            "bb2a4828-46eb-8cd1-e765-15848195d751": 1
        },
        "gameStartTime": "2024-02-11T10:35:13.218Z"
    },
    "success": true
}
```

-----
* Locking Agent : UID in path
  *URL Suffix* : `api/lock-agent/:playerId`
  *Request Body* : 
  ```
  {
    "agentId": "e370fa57-4757-3604-3648-499e1f642d3f"
  }```

  *Response*
    ```
    {
        "success": true,
        "playerId": "10810a49-96b3-42fa-88af-1a69682a3789",
        "profileImage": "https://media.valorant-api.com/agents/7f94d92c-4234-0a36-9646-3a87eb8b5c89/displayicon.png",
        "games": [
            "e370fa57-4757-3604-3648-499e1f642d3f"
        ],
        "agentSelectionMeta": {
            "e370fa57-4757-3604-3648-499e1f642d3f": 1
        }
    }```


