# Power Query (M) Documentation

## Overview
All data transformation logic resides in Dataflows or Dataset Power Query steps to ensure clean data reaches the model.

## 1. Parameters
*   `ServerName`: Server environment (Dev/Test/Prod).
*   `DatabaseName`: SQL Database name.
*   `RangeStart`/`RangeEnd`: For Incremental Refresh.

## 2. Key Transformations

### Standardization