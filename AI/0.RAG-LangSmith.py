import os
from typing import List, Dict
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.schema import Document
from langchain.vectorstores import Chroma
from langchain.embeddings import OpenAIEmbeddings
from langchain.chat_models import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langgraph.graph import Graph
from langgraph.prebuilt import ToolExecutor
from pydantic import BaseModel

# Ensure you have set your OpenAI API key in the environment variables
# os.environ["OPENAI_API_KEY"] = "your-api-key-here"

def read_files(directory: str) -> Dict[str, str]:
    files = {}
    for root, _, filenames in os.walk(directory):
        for filename in filenames:
            if filename.endswith(('.css', '.html')):
                file_path = os.path.join(root, filename)
                with open(file_path, 'r') as file:
                    files[file_path] = file.read()
    return files

def create_documents(files: Dict[str, str]) -> List[Document]:
    documents = []
    for file_path, content in files.items():
        documents.append(Document(page_content=content, metadata={"source": file_path}))
    return documents

def split_documents(documents: List[Document]) -> List[Document]:
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    return text_splitter.split_documents(documents)

def create_vector_store(documents: List[Document]):
    embeddings = OpenAIEmbeddings()
    return Chroma.from_documents(documents, embeddings)

def create_rag_chain(vector_store):
    retriever = vector_store.as_retriever()
    llm = ChatOpenAI(model_name="gpt-3.5-turbo", temperature=0)

    template = """
    You are a CSS and HTML expert. Analyze the following CSS and HTML content and suggest inconsistencies or duplication in CSS usage.
    Focus on:
    1. Duplicate CSS rules
    2. Conflicting CSS rules
    3. Unused CSS classes
    4. Overspecific selectors
    5. Inconsistent naming conventions

    Content:
    {context}

    Human: Based on the above content, what inconsistencies or duplications in CSS usage can you identify?

    Assistant: Let's analyze the content for CSS inconsistencies and duplications:

    """

    prompt = ChatPromptTemplate.from_template(template)

    def rag_chain(question: str):
        docs = retriever.get_relevant_documents(question)
        context = "\n\n".join([d.page_content for d in docs])
        response = llm.invoke(prompt.format(context=context, question=question))
        return response.content

    return rag_chain

class AgentState(BaseModel):
    question: str
    analysis: List[str] = []

def analysis_step(state: AgentState, rag_chain) -> AgentState:
    response = rag_chain(state.question)
    state.analysis.append(response)
    return state

def should_continue(state: AgentState) -> bool:
    return len(state.analysis) < 3  # Adjust this number to control the depth of analysis

def create_graph(rag_chain):
    workflow = Graph()

    workflow.add_node("analysis", lambda state: analysis_step(state, rag_chain))
    workflow.add_node("continue", should_continue)

    workflow.set_entry_point("analysis")
    workflow.add_edge("analysis", "continue")
    workflow.add_edge("continue", "analysis")
    workflow.add_edge("continue", "end")

    return workflow

def main():
    # Read CSS and HTML files
    files = read_files("path/to/your/project")
    documents = create_documents(files)
    split_docs = split_documents(documents)
    
    # Create vector store
    vector_store = create_vector_store(split_docs)
    
    # Create RAG chain
    rag_chain = create_rag_chain(vector_store)
    
    # Create and run the graph
    workflow = create_graph(rag_chain)
    app = workflow.compile()
    
    initial_state = AgentState(question="Analyze the CSS and HTML files for inconsistencies and duplications.")
    final_state = app.invoke(initial_state)
    
    # Print the analysis results
    for i, analysis in enumerate(final_state.analysis, 1):
        print(f"Analysis {i}:\n{analysis}\n")

if __name__ == "__main__":
    main()