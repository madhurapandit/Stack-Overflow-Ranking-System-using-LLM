
# Stack Overflow Ranking Sustems for Solutiosn using Large Language Models
This project aims to create a search engine that aggregates accurate technical solutions from Stack Overflow, streamlining the process for programmers and enthusiasts.


## Overview 
We utilize NLP through transfer learning with pre-trained LLM models such as BERT and ELMo to generate text embeddings. We incorporate the FAISS ranking algorithm and use the NDCG evaluation metric.


## Methodology
Training
![Train workflow](https://github.com/swethasubu93/Stack-Overflow-Ranking-using-LLM/assets/109064336/9d3ac02e-2251-4323-954f-6e1baa55853a)

Testing
![Test workflow](https://github.com/swethasubu93/Stack-Overflow-Ranking-using-LLM/assets/109064336/327b24a2-bcf5-42bd-8659-eefd85af6507)


## Data Process
- *Data preprocess*: Extracted only relevant features from the raw data - questions, all answers, score of answers, accepted answers. 
- *Data cleaning*: Text is preprocessed by lowering case and removing punctuations, stop words, URLs, and HTML tags. BERT - takes text as-is, ELMo - retains stop words for context, while Autoencoder BiLSTM involves comprehensive data cleaning.
- *Data transformation*: Data comprises question-answer pairs, with labels indicating correctness (1) or incorrectness (0). BertTokenizer for BERT model - creates padded tokenized sequences, Keras Tokenizer for Autoencoder BiLSTM - also created padded sequences. ElMo input does not require tokenized input (can take text as is). 
- *Data process for test data*: Embedding models (BERT, ELMo, encoder LSTM) generate test question embeddings. FAISS conducts similarity search between the user's question and the dataset's questions, retrieving the top 5 similar questions. Top answers are obtained, converted to embeddings, and ranked by FAISS, with the website displaying the top 5 answers.

  
## Models/ Algorithm
- *BERT*: BertForSequenceClassification model is used to perform binary classification task (finetuning)  
- *ElMo*: Binary classification task is performed to finetune the model on our data. The embedding layer is extracted for later use after finteuning.  
- *BiLSTM Autoencoder*: Not a classification task. Training the model to generate embeddings. It features an Encoder and Decoder. The Encoder transforms incoming sequences into embeddings (utilizing Embedding and BiLSTM layers), and post-training, only the Encoder is used.
- *FAISS*: FAISS conducts similarity search between new and existing question embeddings in our data corpus.

    
## Evaluation & Results 
- The ranking evaluation of the embeddings by three embedding models in combination with FAISS is given below.
![NDCG Results](https://github.com/swethasubu93/Stack-Overflow-Ranking-using-LLM/assets/109064336/3473eed7-c5e0-48a7-89ee-67fc7d041917)



