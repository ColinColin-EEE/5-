// 6과 문제 데이터 (인터페이스 모드 완전 적용)
const UNIT6_DATA = {
    WORD: [
        { id: 'w6_1', type: 'text', title: "다음 단어의 뜻을 쓰시오.\nkind", answer: ["종류"] },
        { id: 'w6_2', type: 'text', title: "다음 단어의 뜻을 쓰시오.\nusually", answer: ["보통", "대개", "주로"] },
        { id: 'w6_3', type: 'text', title: "다음 단어의 뜻을 쓰시오.\nsci-fi", answer: ["공상 과학의", "과학 소설적인"] },
        { id: 'w6_4', type: 'text', title: "다음 단어의 뜻을 쓰시오.\nnovel", answer: ["소설"] },
        { id: 'w6_5', type: 'text', title: "다음 단어의 뜻을 쓰시오.\nrecommend", answer: ["~을 추천하다", "추천하다"] },
        { id: 'w6_6', type: 'text', title: "다음 단어의 뜻을 쓰시오.\nsoda", answer: ["탄산음료"] },
        { id: 'w6_7', type: 'text', title: "다음 단어의 뜻을 쓰시오.\ngive it a try", answer: ["시도하다", "한번 해 보다"] },
        { id: 'w6_8', type: 'text', title: "다음 단어의 뜻을 쓰시오.\ntry", answer: ["~을 해 보다", "해보다", "시도하다"] },
        { id: 'w6_9', type: 'text', title: "다음 단어의 뜻을 쓰시오.\nfavorite", answer: ["가장 좋아하는", "가장 좋아하는 것"] },
        { id: 'w6_10', type: 'text', title: "다음 단어의 뜻을 쓰시오.\nstrongly", answer: ["강하게", "강력하게"] },
        { id: 'w6_11', type: 'text', title: "다음 단어의 뜻을 쓰시오.\nmagazine", answer: ["잡지"] },
        { id: 'w6_12', type: 'text', title: "다음 단어의 뜻을 쓰시오.\nbe interested in", answer: ["관심이 있다", "흥미가 있다", "~에 관심이 있다", "~에 흥미가 있다"] },
        { id: 'w6_13', type: 'text', title: "다음 단어의 뜻을 쓰시오.\nfind", answer: ["찾다", "찾아내다"] },
        { id: 'w6_14', type: 'text', title: "다음 단어의 뜻을 쓰시오.\nteen", answer: ["십대", "십대 청소년"] },
        { id: 'w6_15', type: 'text', title: "다음 단어의 뜻을 쓰시오.\nlook for", answer: ["~을 찾다", "찾다"] },
        { id: 'w6_16', type: 'text', title: "다음 단어의 뜻을 쓰시오.\nfamous", answer: ["유명한"] },
        { id: 'w6_17', type: 'text', title: "다음 단어의 뜻을 쓰시오.\nwell-known", answer: ["유명한", "잘 알려진"] },
        { id: 'w6_18', type: 'text', title: "다음 단어의 뜻을 쓰시오.\nessay", answer: ["보고서", "에세이"] },
        { id: 'w6_19', type: 'text', title: "다음 단어의 뜻을 쓰시오.\nthink about", answer: ["~에 대해 생각하다"] },
        { id: 'w6_20', type: 'text', title: "다음 단어의 뜻을 쓰시오.\nactor", answer: ["배우"] },
        { id: 'w6_21', type: 'text', title: "다음 단어의 뜻을 쓰시오.\nvolunteer", answer: ["자원봉사", "봉사"] },
        { id: 'w6_22', type: 'text', title: "다음 단어의 뜻을 쓰시오.\nvolunteer work", answer: ["자원봉사 활동", "봉사 활동"] },
        { id: 'w6_23', type: 'text', title: "다음 단어의 뜻을 쓰시오.\nespecially", answer: ["특히", "특별히"] },
        { id: 'w6_24', type: 'text', title: "다음 단어의 뜻을 쓰시오.\nintroduce", answer: ["소개하다"] },
        { id: 'w6_25', type: 'text', title: "다음 단어의 뜻을 쓰시오.\npianist", answer: ["피아니스트"] },
        { id: 'w6_26', type: 'text', title: "다음 단어의 뜻을 쓰시오.\nlose", answer: ["잃다", "~을 잃다"] },
        { id: 'w6_27', type: 'text', title: "다음 단어의 뜻을 쓰시오.\nmove", answer: ["이사하다", "이주하다"] },
        { id: 'w6_28', type: 'text', title: "다음 단어의 뜻을 쓰시오.\ntouching", answer: ["감동적인", "감동을 주는"] },
        { id: 'w6_29', type: 'text', title: "다음 단어의 뜻을 쓰시오.\nforeigner", answer: ["외국인"] },
        { id: 'w6_30', type: 'text', title: "다음 단어의 뜻을 쓰시오.\nFebruary", answer: ["2월"] },
        { id: 'w6_31', type: 'text', title: "다음 단어의 뜻을 쓰시오.\nspecial", answer: ["특별한"] },
        { id: 'w6_32', type: 'text', title: "다음 단어의 뜻을 쓰시오.\nfavor", answer: ["호의", "부탁"] },
        { id: 'w6_33', type: 'text', title: "다음 단어의 뜻을 쓰시오.\nask", answer: ["묻다", "요청하다", "부탁하다", "물어보다"] },
        { id: 'w6_34', type: 'text', title: "다음 단어의 뜻을 쓰시오.\ngather", answer: ["모이다", "모으다"] },
        { id: 'w6_35', type: 'text', title: "다음 단어의 뜻을 쓰시오.\nindependence", answer: ["독립"] },
        { id: 'w6_36', type: 'text', title: "다음 단어의 뜻을 쓰시오.\nindependent", answer: ["독립적인", "독립된", "독립한"] },
        { id: 'w6_37', type: 'text', title: "다음 단어의 뜻을 쓰시오.\ntake a picture of", answer: ["~의 사진을 찍다"] },
        { id: 'w6_38', type: 'text', title: "다음 단어의 뜻을 쓰시오.\nevent", answer: ["사건", "사태"] },
        { id: 'w6_39', type: 'text', title: "다음 단어의 뜻을 쓰시오.\nshare", answer: ["공유하다", "나누다"] },
        { id: 'w6_40', type: 'text', title: "다음 단어의 뜻을 쓰시오.\noutside", answer: ["밖에", "밖에서", "바깥에", "바깥에서"] },
        { id: 'w6_41', type: 'text', title: "다음 단어의 뜻을 쓰시오.\nMarch", answer: ["3월"] },
        { id: 'w6_42', type: 'text', title: "다음 단어의 뜻을 쓰시오.\nhide", answer: ["숨다"] },
        { id: 'w6_43', type: 'text', title: "다음 단어의 뜻을 쓰시오.\nbuilding", answer: ["건물"] },
        { id: 'w6_44', type: 'text', title: "다음 단어의 뜻을 쓰시오.\nunbelievable", answer: ["믿기지 않는", "믿기 힘들 정도의"] },
        { id: 'w6_45', type: 'text', title: "다음 단어의 뜻을 쓰시오.\nhope", answer: ["바라다", "희망하다", "소망하다"] },
        { id: 'w6_46', type: 'text', title: "다음 단어의 뜻을 쓰시오.\nlearn", answer: ["알게 되다", "배우다"] },
        { id: 'w6_47', type: 'text', title: "다음 단어의 뜻을 쓰시오.\nthrough", answer: ["~을 통해", "통해", "통하여", "~을 통하여", "통해서"] },
        { id: 'w6_48', type: 'text', title: "다음 단어의 뜻을 쓰시오.\nsound", answer: ["~하게 들리다", "들리다"] },
        { id: 'w6_49', type: 'text', title: "다음 단어의 뜻을 쓰시오.\nsimilar to", answer: ["~와 비슷한"] },
        { id: 'w6_50', type: 'text', title: "다음 단어의 뜻을 쓰시오.\nreal", answer: ["실제의", "진짜의"] },
        { id: 'w6_51', type: 'text', title: "다음 단어의 뜻을 쓰시오.\nmeaning", answer: ["의미", "뜻"] },
        { id: 'w6_52', type: 'text', title: "다음 단어의 뜻을 쓰시오.\nCanadian", answer: ["캐나다인", "캐나다 사람", "캐나다의"] },
        { id: 'w6_53', type: 'text', title: "다음 단어의 뜻을 쓰시오.\nfirst", answer: ["최초로", "처음으로"] },
        { id: 'w6_54', type: 'text', title: "다음 단어의 뜻을 쓰시오.\nmedicine", answer: ["의학"] },
        { id: 'w6_55', type: 'text', title: "다음 단어의 뜻을 쓰시오.\nright away", answer: ["즉시", "곧바로"] },
        { id: 'w6_56', type: 'text', title: "다음 단어의 뜻을 쓰시오.\nright", answer: ["권리"] },
        { id: 'w6_57', type: 'text', title: "다음 단어의 뜻을 쓰시오.\ncountry", answer: ["나라"] },
        { id: 'w6_58', type: 'text', title: "다음 단어의 뜻을 쓰시오.\nmovement", answer: ["운동"] },
        { id: 'w6_59', type: 'text', title: "다음 단어의 뜻을 쓰시오.\nshout", answer: ["소리치다", "외치다", "소리지르다"] },
        { id: 'w6_60', type: 'text', title: "다음 단어의 뜻을 쓰시오.\nhistoric", answer: ["역사적인", "역사상 중요한"] },
        { id: 'w6_61', type: 'text', title: "다음 단어의 뜻을 쓰시오.\nforeign", answer: ["외국의"] },
        { id: 'w6_62', type: 'text', title: "다음 단어의 뜻을 쓰시오.\nfight", answer: ["투쟁", "분투"] },
        { id: 'w6_63', type: 'text', title: "다음 단어의 뜻을 쓰시오.\neven", answer: ["조차도", "심지어"] },
        { id: 'w6_64', type: 'text', title: "다음 단어의 뜻을 쓰시오.\nterrible", answer: ["끔찍한", "참혹한"] },
        { id: 'w6_65', type: 'text', title: "다음 단어의 뜻을 쓰시오.\nsituation", answer: ["상황"] },
        { id: 'w6_66', type: 'text', title: "다음 단어의 뜻을 쓰시오.\nunder the watchful eye of", answer: ["~의 감사 하에", "주의 깊게 지켜보는 가운데"] },
        { id: 'w6_67', type: 'text', title: "다음 단어의 뜻을 쓰시오.\nwatchful", answer: ["감시하는", "주의 깊게 지켜보는"] },
        { id: 'w6_68', type: 'text', title: "다음 단어의 뜻을 쓰시오.\nreturn", answer: ["돌아오다", "돌아가다"] },
        { id: 'w6_69', type: 'text', title: "다음 단어의 뜻을 쓰시오.\ninvitation", answer: ["초대", "초청"] },
        { id: 'w6_70', type: 'text', title: "다음 단어의 뜻을 쓰시오.\ndie", answer: ["죽다"] },
        { id: 'w6_71', type: 'text', title: "다음 단어의 뜻을 쓰시오.\npoor", answer: ["가난한", "빈곤한"] },
        { id: 'w6_72', type: 'text', title: "다음 단어의 뜻을 쓰시오.\npoverty", answer: ["빈곤", "가난"] },
        { id: 'w6_73', type: 'text', title: "다음 단어의 뜻을 쓰시오.\nnational", answer: ["국가적인"] },
        { id: 'w6_74', type: 'text', title: "다음 단어의 뜻을 쓰시오.\ncemetery", answer: ["묘지", "공동 묘지"] },
        { id: 'w6_75', type: 'text', title: "다음 단어의 뜻을 쓰시오.\nbury", answer: ["매장하다", "묻다"] },
        { id: 'w6_76', type: 'text', title: "다음 단어의 뜻을 쓰시오.\nrest", answer: ["나머지"] },
        { id: 'w6_77', type: 'text', title: "다음 단어의 뜻을 쓰시오.\ngovernment", answer: ["정부"] },
        { id: 'w6_78', type: 'text', title: "다음 단어의 뜻을 쓰시오.\narticle", answer: ["기사"] }
    ],
    VOCAB: [],
    DIALOGUE: [
        {
            id: 'd6_1',
            type: 'choice',
            title: "다음을 대화에 맞게 순서대로 배열하시오.",
            options: [
                "What kinds of movies do you like?\nI like sci-fi movies.\nMe, too. Can you recommend a good sci-fi movie for me?\nTry Travel to the Future. It's really good.",
                "I like sci-fi movies.\nWhat kinds of movies do you like?\nTry Travel to the Future. It's really good.\nMe, too. Can you recommend a good sci-fi movie for me?",
                "What kinds of movies do you like?\nMe, too. Can you recommend a good sci-fi movie for me?\nI like sci-fi movies.\nTry Travel to the Future. It's really good.",
                "Try Travel to the Future. It's really good.\nWhat kinds of movies do you like?\nI like sci-fi movies.\nMe, too. Can you recommend a good sci-fi movie for me?"
            ],
            answer: 0
        },
        {
            id: 'd6_2',
            type: 'arrange',
            title: "'좋은 영화 하나 추천해 줄 수 있니?'에 알맞게 말을 배열하시오.",
            words: ["Can", "you", "suggest", "a", "good", "movie?"],
            answer: ["Can", "you", "suggest", "a", "good", "movie?"]
        },
        {
            id: 'd6_3',
            type: 'choice',
            title: "빈칸에 들어갈 말은?\nA: Can you recommend some food?\nB: (                  )",
            options: [
                "Try Time Machine.",
                "I usually eat Italian food.",
                "How about chocolate cookies?",
                "I love a cherry soda."
            ],
            answer: 2
        },
        {
            id: 'd6_4',
            type: 'choice',
            title: "빈칸에 들어갈 말은?\nA: Can you recommend a restaurant for me?\nB: How about Morning in Venice?\nA: (                                )\nB: They have Italian food. I strongly recommend their chess pizza. It's really good.",
            options: [
                "What kind of food do they have?",
                "Why don't you try some pizza?",
                "I love the restaurant for you.",
                "What do you recommend?"
            ],
            answer: 0
        }
    ],
    GRAMMAR: [
        {
            id: 'g6_1',
            type: 'choice',
            title: "빈칸에 알맞은 말은?\nLast night, they felt the ground (    ).",
            options: ["shake", "shaken", "to shake", "shakes"],
            answer: 0
        },
        {
            id: 'g6_2',
            type: 'choice',
            title: "빈칸에 알맞은 말은?\nI saw Angela (    ) the pizza.",
            options: ["ate", "eating", "to eat", "eaten"],
            answer: 1
        },
        {
            id: 'g6_3',
            type: 'choice',
            title: "빈칸에 알맞은 말은?\nI saw the girl (    ) a song.",
            options: ["sing", "to sing", "sings", "sang"],
            answer: 0
        },
        {
            id: 'g6_4',
            type: 'multi_choice',
            title: "각 괄호 안에서 알맞은 말을 각각 선택하시오.",
            dialogue: "- We watched him [crossed / cross] the street.\n- I feel something [to touch / touching] my hand.\n- This is so heavy [which / that] we can't carry it.",
            groups: [
                { label: "1번째 선택", options: ["crossed", "cross"], answer: "cross" },
                { label: "2번째 선택", options: ["to touch", "touching"], answer: "touching" },
                { label: "3번째 선택", options: ["which", "that"], answer: "that" }
            ]
        },
        {
            id: 'g6_5',
            type: 'choice',
            title: "빈칸에 알맞은 말은?\nWe (    ) the storm coming.",
            options: ["noticed", "kept", "washed", "made"],
            answer: 0
        },
        {
            id: 'g6_6',
            type: 'multi_choice',
            title: "각 괄호 안에서 알맞은 말을 각각 선택하시오.",
            dialogue: "- I noticed my best friend [stand / standed] at the door.\n- The two bears saw hundreds of bees [to fly / flying] at them.",
            groups: [
                { label: "1번째 선택", options: ["stand", "standed"], answer: "stand" },
                { label: "2번째 선택", options: ["to fly", "flying"], answer: "flying" }
            ]
        },
        {
            id: 'g6_7',
            type: 'choice',
            title: "빈칸에 알맞은 말은?\nA boy watched people (    ) in tents.",
            options: ["to live", "live", "lived", "lives"],
            answer: 1
        },
        {
            id: 'g6_8',
            type: 'choice',
            title: "빈칸에 알맞은 말은?\nA boy watches me (    ) football every weekend.",
            options: ["playing", "plays", "played", "to play"],
            answer: 0
        },
        {
            id: 'g6_9',
            type: 'choice',
            title: "어법상 옳은 것을 모두 고르시오.",
            options: [
                "Did you see anyone came into this room?",
                "He was so smart that he can solve it.",
                "I felt my house shaken.",
                "She heard John speaking English."
            ],
            answer: [3]
        },
        {
            id: 'g6_10',
            type: 'choice',
            title: "어법상 옳은 것을 모두 고르시오.",
            options: [
                "I saw a dog ran after a cat.",
                "I'm too tired to move my legs.",
                "This is so expensive that I can't buy.",
                "I slept too late to get up early."
            ],
            answer: [1, 3]
        },
        {
            id: 'g6_11',
            type: 'text',
            title: "다음 문장을 'too ... to' 구문으로 바꾸시오.\nHe is so young that he can't go to school.",
            answer: ["He is too young to go to school.", "He is too young to go to school"]
        },
        {
            id: 'g6_12',
            type: 'text',
            title: "다음 문장을 'too ... to' 구문으로 바꾸시오.\nShe was so busy that she couldn't take a break.",
            answer: ["She was too busy to take a break.", "She was too busy to take a break"]
        },
        {
            id: 'g6_13',
            type: 'text',
            title: "다음 문장을 'too ... to' 구문으로 바꾸시오.\nI was very hungry. I couldn't say a word.",
            answer: ["I was too hungry to say a word.", "I was too hungry to say a word"]
        },
        {
            id: 'g6_14',
            type: 'text',
            title: "다음 문장을 'too ... to' 구문으로 바꾸시오.\nThe problem was very difficult. We couldn't solve it.",
            answer: ["The problem was too difficult for us to solve.", "The problem was too difficult for us to solve"]
        },
        {
            id: 'g6_15',
            type: 'choice',
            title: "빈칸에 알맞은 말은?\nThe rain was so heavy (    ) it made our picnic impossible.",
            options: ["which", "that", "what", "whom", "who"],
            answer: 1
        },
        {
            id: 'g6_16',
            type: 'text',
            title: "다음 문장을 'too ... to' 구문으로 바꾸시오.\nIt was so dark that I couldn't see his face.",
            answer: ["It was too dark to see his face.", "It was too dark for me to see his face.", "It was too dark to see his face", "It was too dark for me to see his face"]
        },
        {
            id: 'g6_17',
            type: 'choice',
            title: "다음 문장과 같은 의미인 것은?\nWe studied so hard that we could pass the exam.",
            options: [
                "We studied too hard to pass the exam.",
                "We didn't study too hard to pass the exam.",
                "We can study hard to pass the exam.",
                "We studied hard enough to pass the exam."
            ],
            answer: 3
        },
        {
            id: 'g6_18',
            type: 'arrange',
            title: "'이 컴퓨터는 매우 작아서 나는 들 수 있다.'에 알맞게 말을 배열하시오.",
            words: ["This computer", "is", "so", "small", "that", "I", "can", "carry", "it."],
            answer: ["This computer", "is", "so", "small", "that", "I", "can", "carry", "it."]
        },
        {
            id: 'g6_19',
            type: 'arrange',
            title: "'그 영화는 너무 지루해서 나는 잠에 빠졌다.'에 알맞게 말을 배열하시오.",
            words: ["The movie", "was", "so", "boring", "that", "I", "fell", "asleep."],
            answer: ["The movie", "was", "so", "boring", "that", "I", "fell", "asleep."]
        },
        {
            id: 'g6_20',
            type: 'arrange',
            title: "'그 테이블은 매우 무거워서 그들은 움직일 수 없었다.'에 알맞게 말을 배열하시오.",
            words: ["The table", "was", "so", "heavy", "that", "they", "could", "not", "move", "it."],
            answer: ["The table", "was", "so", "heavy", "that", "they", "could", "not", "move", "it."]
        },
        {
            id: 'g6_21',
            type: 'arrange',
            title: "'그는 너무 긴장해서 무대에서 잘 공연할 수 없었다.'에 알맞게 말을 배열하시오.",
            words: ["He", "was", "too", "nervous", "to", "perform", "well", "on stage."],
            answer: ["He", "was", "too", "nervous", "to", "perform", "well", "on stage."]
        },
        {
            id: 'g6_22',
            type: 'arrange',
            title: "'나는 그것을 사기에 너무 가난하다'에 알맞게 말을 배열하시오.",
            words: ["I", "am", "too", "poor", "to", "buy", "it."],
            answer: ["I", "am", "too", "poor", "to", "buy", "it."]
        },
        {
            id: 'g6_23',
            type: 'arrange',
            title: "'그는 경주를 이기기에 너무 느리게 달렸다.'에 알맞게 말을 배열하시오.",
            words: ["He", "ran", "too", "slowly", "to", "win", "the", "race."],
            answer: ["He", "ran", "too", "slowly", "to", "win", "the", "race."]
        },
        {
            id: 'g6_24',
            type: 'choice',
            title: "다음 문장과 같은 의미인 것은?\nI am so tired that I can't walk any more.",
            options: [
                "I am very tired not to walk any more.",
                "I am too tired to walk any more.",
                "I am so tired enough to walk any more.",
                "I am not very tired in order to walk any more."
            ],
            answer: 1
        },
        {
            id: 'g6_25',
            type: 'text',
            title: "다음 문장을 'so ... that' 구문으로 바꾸시오.\nHe was too angry to speak.",
            answer: ["He was so angry that he couldn't speak.", "He was so angry that he couldn't speak"]
        },
        {
            id: 'g6_26',
            type: 'text',
            title: "다음 문장을 'so ... that' 구문으로 바꾸시오.\nHe is too shy to get along with his friends.",
            answer: ["He is so shy that he can't get along with his friends.", "He is so shy that he cannot get along with his friends.", "He is so shy that he can't get along with his friends"]
        },
        {
            id: 'g6_27',
            type: 'text',
            title: "다음 문장을 'so ... that' 구문으로 바꾸시오.\nShe is too poor to buy it.",
            answer: ["She is so poor that she can't buy it.", "She is so poor that she cannot buy it.", "She is so poor that she can't buy it"]
        },
        {
            id: 'g6_28',
            type: 'text',
            title: "다음 문장을 'so ... that' 구문으로 바꾸시오.\nShe was too old to walk fast.",
            answer: ["She was so old that she couldn't walk fast.", "She was so old that she could not walk fast.", "She was so old that she couldn't walk fast"]
        },
        {
            id: 'g6_29',
            type: 'text',
            title: "다음 문장을 'so ... that' 구문으로 바꾸시오.\nShe was too stupid to be a doctor.",
            answer: ["She was so stupid that she couldn't be a doctor.", "She was so stupid that she could not be a doctor.", "She was so stupid that she couldn't be a doctor"]
        },
        {
            id: 'g6_30',
            type: 'choice',
            title: "다음 문장과 같은 의미인 것은?\nHe cooked soup so well that it could taste great.",
            options: [
                "He cooked soup too well to taste great.",
                "He cooked soup too well for it not to taste great.",
                "He cooked soup well enough to taste great.",
                "He cooked soup well enough for it to taste great."
            ],
            answer: 3
        },
        {
            id: 'g6_31',
            type: 'choice',
            title: "다음 세 문장에 따라 도출한 결론은?\n- The suit was so expensive that Tom couldn't buy it.\n- The suit is too expensive for Jerry to buy.\n- The suit is cheap enough for Spike to buy.",
            options: [
                "정장 가격을 기준으로 볼 때, 구매할 수 있는 경제적 여유가 가장 큰 사람은 Jerry이다.",
                "정장 가격을 기준으로 볼 때, 구매할 수 있는 경제적 여유가 가장 작은 사람은 Tom이다.",
                "정장 가격을 기준으로 볼 때, 구매할 수 있는 경제적 여유가 가장 큰 사람은 Jerry이다.",
                "정장 가격을 기준으로 볼 때, 구매할 수 있는 경제적 여유가 가장 큰 사람은 Spike이다."
            ],
            answer: 3
        },
        {
            id: 'g6_32',
            type: 'choice',
            title: "다음 세 문장에 따라 도출된 결론으로 보아, 빈칸에 들어갈 말은?\n- The box was so heavy that the boy couldn't lift it alone.\n- The box is too heavy for the girl to lift.\n- The box is (           ) to lift easily.\n결론: 이 상자를 혼자서 들 수 있는 사람은 'the man'뿐이다.",
            options: [
                "light enough for the man",
                "too heavy for the man",
                "too light for the man",
                "heavy enough for the man"
            ],
            answer: 0
        }
    ],
    READING: [
        {
            id: 'r6_1',
            type: 'choice',
            title: "6과 본문에서 한 남자가 Schofield 박사의 집에 찾아와 한국의 독립 운동 현장을 촬영해 달라고 부탁한 날의 일자는?",
            options: ["1919년 2월 28일", "1919년 3월 1일", "1921년 2월 28일", "1921년 3월 1일"],
            answer: 0
        },
        {
            id: 'r6_2',
            type: 'choice',
            title: "6과 본문의 내용과 일치하는 것은?",
            options: [
                "Schofield 박사는 1915년에 한국에 처음 왔다.",
                "Schofield 박사는 캐나다의 사진 작가였다.",
                "Schofield 박사는 1970년에 세상을 떠났다.",
                "Schofield 박사는 한국의 독립 운동을 도모하였다."
            ],
            answer: 2
        },
        {
            id: 'r6_3',
            type: 'text',
            title: "6과 본문의 내용으로 보아, 한국 정부의 초청으로 Schofield 박사가 한국으로 돌아왔던 해를 숫자로만 쓰시오.",
            answer: ["1958"]
        },
        {
            id: 'r6_4',
            type: 'text',
            title: "빈칸에 들어갈 말을 우리말로 쓰시오.\n1919년 3월 1일에 Schofield 박사는 (        )에서 시람들이 한국의 독립을 의치는 소리를 들었다.",
            answer: ["탑골공원", "탑골 공원"]
        },
        {
            id: 'r6_5',
            type: 'arrange',
            title: "'그는 매우 열심히 공부해서 몇 년 만에 한국어로 가르칠 수 있게 되었다.'에 알맞게 말을 배열하시오.",
            words: ["He", "studied", "so", "hard", "that", "he", "was able to", "teach", "in Korean", "after only", "a few", "years."],
            answer: ["He", "studied", "so", "hard", "that", "he", "was able to", "teach", "in Korean", "after only", "a few", "years."]
        },
        {
            id: 'r6_6',
            type: 'arrange',
            title: "'그의 여생 동안'에 알맞게 말을 배열하시오.",
            words: ["for", "the", "rest", "of", "his", "life"],
            answer: ["for", "the", "rest", "of", "his", "life"]
        },
        {
            id: 'r6_7',
            type: 'choice',
            title: "6과 본문의 내용과 일치하는 것을 모두 고르시오.",
            options: [
                "Schofield 박사의 한국어 이름은 석호필이다.",
                "Schofield 박사는 직접 외국 신문사에 보낼 기사를 썼다.",
                "Schofield 박사가 캐나다로 돌아간 것은 일본 경찰의 감시 때문이다.",
                "Schofield 박사는 1960년에 세상을 떠났다."
            ],
            answer: [0, 1, 2]
        },
        {
            id: 'r6_8',
            type: 'choice',
            title: "6과 본문의 내용과 일치하는 것을 모두 고르시오.",
            options: [
                "Schofield 박사는 의학을 가르치러 한국에 처음 왔다.",
                "Schofield 박사는 3월 1일 오후 2시에 공원 나무에 숨어 있었다.",
                "Schofield 박사는 캐나다에서 사진 작가로 일했다.",
                "Schofield 박사가 한국에 처음 온 것은 1916년이다."
            ],
            answer: [0, 3]
        },
        {
            id: 'r6_9',
            type: 'choice',
            title: "6과 본문의 내용과 일치하는 것을 모두 고르시오.",
            options: [
                "Schofield 박사는 1920년에 캐나다로 돌아갔다.",
                "Schofield 박사는 탑골공원의 독립 현장을 촬영하였다.",
                "Schofield 박사는 1958년에 독립운동가의 초대로 한국에 돌아왔다.",
                "Schofield 박사는 외국 신문에 전달할 기사를 직접 작성하였다."
            ],
            answer: [0, 1, 3]
        },
        {
            id: 'r6_10',
            type: 'choice',
            title: "6과 본문의 내용과 일치하는 것을 모두 고르시오.",
            options: [
                "Schofield 박사는 한국 정부의 초청으로 돌아온 후 캐나다에서 세상을 떠났다.",
                "Schofield 박사는 1919년에 한국의 독립 현장을 직접 촬영하였다.",
                "Schofield 박사는 3월 1일 오후 2시에 건물 안에 숨어 있었다.",
                "Schofield 박사는 한국어로 의학을 가르칠 수 있는 정도가 되었다."
            ],
            answer: [1, 2, 3]
        },
        {
            id: 'r6_11',
            type: 'arrange',
            title: "6과 본문의 내용으로 보아, 다음 사건들을 일어난 순서대로 배열하시오.",
            words: [
                "Schofield 박사가 탑골공원에서 독립을 외치는 소리를 들음.",
                "Schofield 박사가 한국의 독립에 대한 기사를 신문사에 보냄.",
                "Schofield 박사가 캐나다로 돌아감."
            ],
            answer: [
                "Schofield 박사가 탑골공원에서 독립을 외치는 소리를 들음.",
                "Schofield 박사가 한국의 독립에 대한 기사를 신문사에 보냄.",
                "Schofield 박사가 캐나다로 돌아감."
            ]
        },
        {
            id: 'r6_12',
            type: 'text',
            title: "6과 본문의 내용으로 보아, Schofield 박사가 세상을 떠난 해의 년도를 숫자로만 쓰시오.",
            answer: ["1970"]
        },
        {
            id: 'r6_13',
            type: 'arrange',
            title: "'그는 한국 정부의 초대로 한국에 돌아왔다.'에 알맞게 말을 배열하시오.",
            words: ["He", "returned", "to Korea", "at", "the invitation", "of", "the Korean", "government."],
            answer: ["He", "returned", "to Korea", "at", "the invitation", "of", "the Korean", "government."]
        },
        {
            id: 'r6_14',
            type: 'arrange',
            title: "'그는 일본 경찰의 감시를 받았다.'에 알맞게 말을 배열하시오.",
            words: ["He", "was", "under", "the", "watchful", "eye", "of", "Japanese", "police."],
            answer: ["He", "was", "under", "the", "watchful", "eye", "of", "Japanese", "police."]
        },
        {
            id: 'r6_15',
            type: 'choice',
            title: "6과 본문의 내용과 일치하는 것을 모두 고르시오.",
            options: [
                "Schofield 박사는 가난한 한국 학생들을 도왔다.",
                "Schofield 박사는 한국어를 직접 공부하였다.",
                "Schofield 박사는 자신의 한국 이름을 가지고 있다.",
                "Schofield 박사는 의학을 가르치려고 1918년에 한국에 처음 왔다."
            ],
            answer: [0, 1, 2]
        },
        {
            id: 'r6_16',
            type: 'choice',
            title: "6과 본문의 내용과 일치하는 것을 모두 고르시오.",
            options: [
                "Schofield 박사는 1920년에 캐나다로 돌아갔다.",
                "Schofield 박사는 1958년에 정부의 초청으로 한국에 돌아왔다.",
                "Schofield 박사는 국립서울현충원에 안장되었다.",
                "Schofield 박사는 한국의 독립 소식을 신문사에서 전달받았다."
            ],
            answer: [0, 1, 2]
        },
        {
            id: 'r6_17',
            type: 'choice',
            title: "6과 본문의 내용과 일치하는 것을 모두 고르시오.",
            options: [
                "Schofield 박사는 정부의 초대로 1916년에 한국에 처음 왔다.",
                "Schofield 박사는 오전 2시에 많은 사람이 모인 장면을 촬영하였다.",
                "Schofield 박사는 2월 28일에 한 남자에게 특별한 부탁을 받았다.",
                "Schofield 박사는 일본 경찰의 감시로 1919년에 캐나다로 돌아갔다."
            ],
            answer: [2]
        },
        {
            id: 'r6_18',
            type: 'text',
            title: "6과 본문의 내용으로 보아, 빈칸에 들어갈 말을 영어 한 단어로 쓰시오.\nDr. Schofield was a Canadian doctor, and he first came to Korea in 1916 to teach (        ).",
            answer: ["medicine"]
        },
        {
            id: 'r6_19',
            type: 'text',
            title: "6과 본문의 내용으로 보아, 빈칸에 들어갈 전치사를 쓰시오.\nIt sounded similar (    ) his real name, and it also had a good meaning.",
            answer: ["to"]
        },
        {
            id: 'r6_20',
            type: 'multi_choice',
            title: "각 괄호 안에서 알맞은 말을 각각 선택하시오.",
            dialogue: "[In / On] February 28, 1919, a man came to Dr. Schofield's house.\nMan: Dr. Schofield, I have a special favor [asking / to ask] you.\nDr. Schofield: What can I do [with / for] you?\nMan: Many people are going [gathering / to gather] tomorrow for the [independent / independence] of Korea.",
            groups: [
                { label: "1번째 선택", options: ["In", "On"], answer: "On" },
                { label: "2번째 선택", options: ["asking", "to ask"], answer: "to ask" },
                { label: "3번째 선택", options: ["with", "for"], answer: "for" },
                { label: "4번째 선택", options: ["gathering", "to gather"], answer: "to gather" },
                { label: "5번째 선택", options: ["independent", "independence"], answer: "independence" }
            ]
        },
        {
            id: 'r6_21',
            type: 'multi_choice',
            title: "각 괄호 안에서 알맞은 말을 각각 선택하시오.",
            dialogue: "Could you take pictures [of / for] the event and share them [for / with] the world? At 2 p.m. [in / on] March 1, Dr. Schofield was hiding in a building and saw a large group of people [gather / gathering] outside.",
            groups: [
                { label: "1번째 선택", options: ["of", "for"], answer: "of" },
                { label: "2번째 선택", options: ["for", "with"], answer: "with" },
                { label: "3번째 선택", options: ["in", "on"], answer: "on" },
                { label: "4번째 선택", options: ["gather", "gathering"], answer: "gathering" }
            ]
        },
        {
            id: 'r6_22',
            type: 'multi_choice',
            title: "각 괄호 안에서 알맞은 말을 각각 선택하시오.",
            dialogue: "[On / At] March 1, 1919, Dr. Schofield heard people [to shout / shouting] for Korean independence [in / on] Tapgol Park. He took pictures of the event [for / with] his camera.",
            groups: [
                { label: "1번째 선택", options: ["On", "At"], answer: "On" },
                { label: "2번째 선택", options: ["to shout", "shouting"], answer: "shouting" },
                { label: "3번째 선택", options: ["in", "on"], answer: "in" },
                { label: "4번째 선택", options: ["for", "with"], answer: "with" }
            ]
        },
        {
            id: 'r6_23',
            type: 'multi_choice',
            title: "각 괄호 안에서 알맞은 말을 각각 선택하시오.",
            dialogue: "He took pictures of the event [with / on] his camera. He then wrote an article about the [history / historic] event and sent it [to / for] foreign newspapers [for / with] his pictures. Dr. Schofield's fight for Korean independence didn't stop [even / evenly] after the March 1st Movement.",
            groups: [
                { label: "1번째 선택", options: ["with", "on"], answer: "with" },
                { label: "2번째 선택", options: ["history", "historic"], answer: "historic" },
                { label: "3번째 선택", options: ["to", "for"], answer: "to" },
                { label: "4번째 선택", options: ["for", "with"], answer: "with" },
                { label: "5번째 선택", options: ["even", "evenly"], answer: "even" }
            ]
        },
        {
            id: 'r6_24',
            type: 'choice',
            title: "연도별로 Schofield 박사에게 일어난 일로 옳은 것을 모두 고르시오.",
            options: [
                "1916 - 의학을 가르치러 한국에 처음 왔다.",
                "1919 - 3.1 운동의 장면을 촬영하였다.",
                "1920 - 캐나다로 여행을 떠났다.",
                "1958 - 일본 경찰의 감시를 받았다.",
                "1970 - 국립서울현충원에 안장되었다."
            ],
            answer: [0, 1, 4]
        },
        {
            id: 'r6_25',
            type: 'choice',
            title: "6과 본문의 내용과 일치하는 것을 모두 고르시오.",
            options: [
                "1919년 2월 28일에 한 남자가 Schofield 박사를 찾아왔다.",
                "Schofield 박사는 3월 1일 오후 2시에 건물 밖에서 현장을 촬영하였다.",
                "Schofield 박사는 정부 초대로 한국에 온 후 캐나다로 돌아갔다.",
                "Schofield 박사는 한국의 독립을 위한 행사의 사진을 찍어 달라는 부탁을 받았다."
            ],
            answer: [0, 3]
        }
    ]
};
