
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
- *BERT*: BertForSequenceClassification model is used to perform binary classification task (finetuning) [Finteune](https://github.com/swethasubu93/Stack-Overflow-Ranking-using-LLM/blob/main/Code/BERT_Training.ipynb) & [Evaluation](https://github.com/swethasubu93/Stack-Overflow-Ranking-using-LLM/blob/main/Code/BERT_Evaluation.ipynb) 
- *ElMo*: Binary classification task is performed to finetune the model on our data. The embedding layer is extracted for later use after finteuning. [Finteune](https://github.com/swethasubu93/Stack-Overflow-Ranking-using-LLM/blob/main/Code/Elmo_Training.ipynb) & [Evaluation](https://github.com/swethasubu93/Stack-Overflow-Ranking-using-LLM/blob/main/Code/ELMo_Evaluation.ipynb) 
- *BiLSTM Autoencoder*: Not a classification task. Training the model to generate embeddings. It features an Encoder and Decoder. The Encoder transforms incoming sequences into embeddings (utilizing Embedding and BiLSTM layers), and post-training, only the Encoder is used. [Training](https://github.com/swethasubu93/Stack-Overflow-Ranking-using-LLM/blob/main/Code/BiLSTM_Autoencoder_Training.ipynb) & [Evaluation](https://github.com/swethasubu93/Stack-Overflow-Ranking-using-LLM/blob/main/Code/BiLSTM_Autoencoder_Evaluation.ipynb)
- *FAISS*: FAISS conducts similarity search between new and existing question embeddings in our data corpus.

    
## Evaluation & Results 
- The ranking evaluation of the embeddings by three embedding models in combination with FAISS is given below.
![NDCG Results](https://github.com/swethasubu93/Stack-Overflow-Ranking-using-LLM/assets/109064336/3473eed7-c5e0-48a7-89ee-67fc7d041917)

## Scaling on Google Cloud Platform
![Cloud Infrastructure](https://github.com/swethasubu93/Stack-Overflow-Ranking-using-LLM/assets/109064336/aac90f89-1e4c-4c29-abbd-b1b85e611123)
- The BERT - FAISS model shows the best results as per NDCG evaluation metric, hence only BERT is fine-tuned on more stackoverflow data (large dataset ~34M rows) on Bigquery table. The model is fine-tuned on a Virtual Machine, spun up on Vertex AI Workbench, that satisfied the GPU, RAM and hard disk requirements. Further, all model artifacts are stored on a google cloud storage bucket.
- Apart from just training, Vertex AI workbench is also used for embeddings generation by the fine-tuned BERT model.
- Finally, the fine-tuned model is stored in Model Registry in vertex AI and then deployed online via Vertex AI online predictions. 

 ## Final Product 
![Picture1](https://github.com/swethasubu93/Stack-Overflow-Ranking-using-LLM/assets/109064336/429a39aa-1e80-40c8-8e48-13faab6357b6)
- This is the final front-end application for the entire project - where user can interact with the model to get a response. 




